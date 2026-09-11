<template>
  <div
    ref="wrapRef"
    class="relative flex items-center justify-center select-none"
    aria-hidden="true"
  >
    <!-- `zoom` (e não transform: scale) volta a desenhar o texto no tamanho final: fica nítido -->
    <div
      ref="stageRef"
      class="auth3d-canvas"
      :style="{ '--mx': pointer.x, '--my': pointer.y, zoom: scale }"
    >
      <div class="auth3d-glow"></div>

      <!-- Palco 3D: órbitas e janela partilham o contexto 3D,
           por isso o anel passa à frente e por trás do painel -->
      <div class="auth3d-rig">
        <div class="sgfm-orbit sgfm-orbit--outer" style="--os: 600px; --oy: 336px">
          <div class="sgfm-orbit-spin">
            <img
              src="/images/hero/3d/coin.png"
              alt=""
              width="44"
              height="44"
              draggable="false"
              class="sgfm-orbit-sat sgfm-orbit-coin"
            />
          </div>
        </div>
        <div class="sgfm-orbit sgfm-orbit--inner" style="--os: 470px; --oy: 352px">
          <div class="sgfm-orbit-spin sgfm-orbit-spin--rev">
            <span class="sgfm-orbit-sat sgfm-orbit-dot"></span>
          </div>
        </div>

        <!-- Janela do dashboard — fixa e de frente -->
        <div class="dash">
          <div class="dash-bar">
            <span class="flex gap-1.5">
              <i class="dash-dot bg-rose-400"></i>
              <i class="dash-dot bg-amber-400"></i>
              <i class="dash-dot bg-emerald-400"></i>
            </span>
            <span class="dash-url">
              <span v-html="ICON.lock"></span>
              sgfm.com/dashboard
            </span>
            <span class="dash-avatar">
              <template v-if="variant === 'live'">AM</template>
              <span v-else v-html="ICON.userSm"></span>
            </span>
          </div>

          <div class="dash-body">
            <div class="dash-side">
              <span class="dash-logo">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="7" width="2.6" height="7" rx="1.2" />
                  <rect x="6.7" y="3" width="2.6" height="11" rx="1.2" />
                  <rect x="11.4" y="5.5" width="2.6" height="8.5" rx="1.2" />
                </svg>
              </span>
              <span
                v-for="(ic, i) in NAV"
                :key="i"
                :class="['dash-nav', { 'is-active': i === 0, 'is-locked': isLocked(i) }]"
                v-html="ic"
              ></span>
            </div>

            <!-- ───────── Login: o dia-a-dia do painel ───────── -->
            <div v-if="variant === 'live'" class="dash-main">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="dash-eyebrow">
                    <span class="dash-live"></span>
                    Fundo de Maneio · Em tempo real
                  </div>
                  <div class="dash-title">Sede · Maputo</div>
                </div>
                <span :class="['dash-chip', TONE.emerald]">Saudável</span>
              </div>

              <div>
                <div class="flex items-center justify-between text-[10px]">
                  <span class="dash-muted">Disponibilidade do fundo</span>
                  <span class="font-bold tabular-nums">68%</span>
                </div>
                <div class="dash-track">
                  <div class="dash-fill" style="width: 68%"></div>
                  <span class="dash-min" style="left: 25%"></span>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div v-for="k in liveKpis" :key="k.label" class="dash-kpi">
                  <div class="flex items-center justify-between gap-1">
                    <span class="dash-kpi-label">{{ k.label }}</span>
                    <span :class="['dash-kpi-icon', TONE[k.tone]]" v-html="k.icon"></span>
                  </div>
                  <div :key="k.value" class="dash-kpi-value dash-swap">{{ k.value }}</div>
                </div>
              </div>

              <div class="min-h-0 flex-1">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="dash-eyebrow">A aguardar aprovação</span>
                  <span class="text-[9px] dash-muted">Todos os departamentos</span>
                </div>
                <TransitionGroup name="dq" tag="ul" class="dash-list">
                  <li
                    v-for="r in queue"
                    :key="r.id"
                    :class="['dash-row', { 'is-approved': r.approved }]"
                  >
                    <span :class="['dash-row-avatar bg-gradient-to-br', r.avatar]">
                      {{ r.initials }}
                    </span>
                    <div class="min-w-0 flex-1">
                      <div class="dash-row-title">{{ r.description }}</div>
                      <div class="dash-row-meta">{{ r.requester }} · {{ r.dept }}</div>
                    </div>
                    <span v-if="r.isNew && !r.approved" :class="['dash-chip', TONE.sky]">Novo</span>
                    <span class="dash-row-amount">{{ fmtMZN(r.amount) }}</span>
                    <span v-if="r.approved" :class="['dash-chip dash-swap', TONE.emerald]">
                      Aprovado
                    </span>
                    <span v-else class="flex gap-1">
                      <span class="dash-btn dash-btn--ok" v-html="ICON.check"></span>
                      <span class="dash-btn dash-btn--no" v-html="ICON.x"></span>
                    </span>
                  </li>
                </TransitionGroup>
              </div>
            </div>

            <!-- ───────── Registo: o painel constrói-se passo a passo ───────── -->
            <div v-else-if="variant === 'setup'" class="dash-main">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="dash-eyebrow">
                    <span class="dash-live"></span>
                    Configuração inicial
                  </div>
                  <div class="dash-title">Bem-vindo ao SGFM</div>
                </div>
                <span :key="pct" :class="['dash-chip dash-swap', TONE.sky]">{{ pct }}%</span>
              </div>

              <div>
                <div class="flex items-center justify-between text-[10px]">
                  <span class="dash-muted">O seu painel</span>
                  <span class="font-bold tabular-nums">{{ done }} de 4 passos</span>
                </div>
                <div class="dash-track">
                  <div class="dash-fill" :style="{ width: `${pct}%` }"></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="(s, i) in steps"
                  :key="s.title"
                  :class="['dash-step', `is-${stateOf(i)}`]"
                >
                  <span class="dash-step-icon">
                    <span v-if="stateOf(i) === 'done'" v-html="ICON.check"></span>
                    <span v-else-if="stateOf(i) === 'current'" class="dash-step-pulse"></span>
                    <template v-else>{{ i + 1 }}</template>
                  </span>
                  <div class="min-w-0">
                    <div class="dash-row-title">{{ s.title }}</div>
                    <div class="dash-row-meta">{{ s.hint }}</div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div v-for="(k, i) in SETUP_KPIS" :key="k.label" class="dash-kpi">
                  <div class="flex items-center justify-between gap-1">
                    <span class="dash-kpi-label">{{ k.label }}</span>
                    <span
                      :class="['dash-kpi-icon', i < done ? TONE[k.tone] : TONE.slate]"
                      v-html="k.icon"
                    ></span>
                  </div>
                  <div v-if="i < done" class="dash-kpi-active dash-swap">
                    <span class="dash-live"></span>
                    Activo
                  </div>
                  <div v-else class="dash-skeleton"></div>
                </div>
              </div>

              <div class="dash-note">
                <span v-html="ICON.shield"></span>
                {{
                  done >= 4
                    ? 'Painel pronto. Bem-vindo à equipa!'
                    : 'O painel fica disponível assim que concluir o registo.'
                }}
              </div>
            </div>

            <!-- ───────── Recuperação: a conta volta a ficar segura ───────── -->
            <div v-else class="dash-main">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="dash-eyebrow">
                    <span class="dash-live"></span>
                    Recuperação de acesso
                  </div>
                  <div class="dash-title">Segurança da conta</div>
                </div>
                <span
                  :key="done >= 3 ? 'ok' : 'wip'"
                  :class="['dash-chip dash-swap', done >= 3 ? TONE.emerald : TONE.sky]"
                >
                  {{ done >= 3 ? 'Acesso reposto' : 'Em curso' }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="(s, i) in steps"
                  :key="s.title"
                  :class="['dash-step', `is-${stateOf(i)}`]"
                >
                  <span class="dash-step-icon">
                    <span v-if="stateOf(i) === 'done'" v-html="ICON.check"></span>
                    <span v-else-if="stateOf(i) === 'current'" class="dash-step-pulse"></span>
                    <template v-else>{{ i + 1 }}</template>
                  </span>
                  <div class="min-w-0">
                    <div class="dash-row-title">{{ s.title }}</div>
                    <div class="dash-row-meta">{{ s.hint }}</div>
                  </div>
                </div>
              </div>

              <div class="dash-kpi">
                <div class="flex items-center justify-between gap-2">
                  <span class="dash-kpi-label">Código de verificação</span>
                  <span :class="['dash-kpi-label font-semibold', { 'str-4': done >= 2 }]">
                    {{ otpCaption }}
                  </span>
                </div>
                <div class="dash-otp">
                  <span
                    v-for="(d, i) in OTP_DIGITS"
                    :key="i"
                    :class="['dash-otp-box', { 'is-filled': i < otpShown, 'is-valid': done >= 2 }]"
                  >
                    {{ i < otpShown ? d : '' }}
                  </span>
                </div>
              </div>

              <div class="dash-kpi">
                <div class="flex items-center justify-between gap-2">
                  <span class="dash-kpi-label">Nova palavra-passe</span>
                  <span :class="['dash-kpi-label font-semibold', `str-${strengthShown}`]">
                    {{ STRENGTH_LABELS[strengthShown] }}
                  </span>
                </div>
                <div class="dash-strength">
                  <span
                    v-for="i in 4"
                    :key="i"
                    :class="['dash-strength-bar', i <= strengthShown ? `lvl-${strengthShown}` : '']"
                  ></span>
                </div>
                <div class="mt-1.5 flex gap-2.5">
                  <span
                    v-for="(r, i) in PASSWORD_RULES"
                    :key="r"
                    :class="['dash-rule', { 'is-ok': strengthShown >= i + 2 }]"
                  >
                    <span v-html="ICON.checkKpi"></span>
                    {{ r }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ───────── Elementos flutuantes (conteúdo por variante em FLOATS) ───────── -->
      <div class="sgfm-parallax left-0 top-0" style="--d: 14">
        <div class="sgfm-bob" style="--dur: 6s; --delay: -2s">
          <div class="sgfm-float-card w-[238px]">
            <div class="flex items-center gap-2.5">
              <span
                :class="[
                  'h-8 w-8 shrink-0 rounded-xl text-white flex items-center justify-center',
                  F.topIconClass,
                ]"
                v-html="F.topIcon"
              ></span>
              <div class="min-w-0">
                <div class="text-[10.5px] text-slate-500 dark:text-slate-400">
                  {{ F.topLabel }}
                </div>
                <div class="text-[12.5px] font-semibold text-slate-900 dark:text-white truncate">
                  {{ F.topTitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sgfm-parallax right-[30px] top-[18px]" style="--d: 26">
        <div class="sgfm-bob" style="--dur: 6.6s; --delay: -1s; --rot: 8deg">
          <img
            :src="F.corner"
            alt=""
            width="60"
            height="60"
            draggable="false"
            class="sgfm-3d-obj w-[60px]"
          />
        </div>
      </div>

      <div class="sgfm-parallax right-0 top-[200px]" style="--d: 34">
        <div class="sgfm-bob" style="--dur: 7.2s; --delay: -3s; --rot: 12deg">
          <img
            src="/images/hero/3d/coin.png"
            alt=""
            width="50"
            height="50"
            draggable="false"
            class="sgfm-3d-obj w-[50px]"
          />
        </div>
      </div>

      <div class="sgfm-parallax left-[18px] bottom-[42px]" style="--d: 30">
        <div class="sgfm-bob" style="--dur: 6.4s; --delay: -4s; --rot: -8deg">
          <img
            :src="F.bottomLeft"
            alt=""
            width="62"
            height="62"
            draggable="false"
            class="sgfm-3d-obj w-[62px]"
          />
        </div>
      </div>

      <div class="sgfm-parallax left-[88px] bottom-[6px]" style="--d: 12">
        <div class="sgfm-bob" style="--dur: 5.6s; --delay: -2.5s">
          <div class="sgfm-float-card sgfm-float-pill">
            <span class="sgfm-ticker-dot"></span>
            {{ F.pill }}
          </div>
        </div>
      </div>

      <div class="sgfm-parallax right-0 bottom-0" style="--d: 16">
        <div class="sgfm-bob" style="--dur: 6.2s; --delay: -0.5s">
          <div class="sgfm-float-card w-[222px]">
            <div class="flex items-center gap-2.5">
              <img
                :src="F.bottomImg"
                alt=""
                width="34"
                height="34"
                draggable="false"
                class="sgfm-3d-obj w-[34px] h-[34px] shrink-0"
              />
              <div class="min-w-0">
                <div
                  :class="[
                    'text-[10.5px]',
                    F.bottomGradient
                      ? 'font-semibold sgfm-gradient-text'
                      : 'text-slate-500 dark:text-slate-400',
                  ]"
                >
                  {{ F.bottomLabel }}
                </div>
                <div class="text-[12.5px] font-semibold text-slate-900 dark:text-white truncate">
                  {{ F.bottomTitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePointerParallax } from '@/composables/landingEffects'

const props = defineProps<{
  /** 'live' = login, 'setup' = registo, 'recover' = recuperação da palavra-passe */
  variant: 'live' | 'setup' | 'recover'
  /** Passo actual do formulário (1..3). Sem valor, `setup`/`recover` avançam sozinhas. */
  step?: number
}>()

// Desenhado a 600×440 e escalado para caber no espaço disponível (largura e altura)
const CANVAS_W = 600
const CANVAS_H = 440
// Pode crescer um pouco em painéis largos (o zoom mantém a nitidez)
const MAX_SCALE = 1.25

const wrapRef = ref<HTMLElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const scale = ref(1)
const pointer = usePointerParallax(stageRef)

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const svg = (d: string, size = 13) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="currentColor"><path d="${d}"/></svg>`

const P = {
  home: 'M10 2.5l7.5 6.5V17a1 1 0 01-1 1h-4v-5H7.5v5h-4a1 1 0 01-1-1V9L10 2.5z',
  inbox:
    'M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v5h3.5a2.5 2.5 0 005 0H16V6H4z',
  wallet:
    'M3 5a2 2 0 012-2h10v3h1a1 1 0 011 1v9a1 1 0 01-1 1H5a2 2 0 01-2-2V5zm2 0v.5h8V5H5zm9 6.5a1 1 0 100 2 1 1 0 000-2z',
  chart: 'M3 3h1.6v12.4H17V17H3V3zm3 8l3-3 2.5 2.5L16 6l1.1 1.1-5.6 5.6L9 10.2l-1.9 1.9L6 11z',
  users:
    'M7 9a3 3 0 100-6 3 3 0 000 6zm6.5 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM7 10.5c-3 0-5.5 1.5-5.5 3.5V16h11v-2c0-2-2.5-3.5-5.5-3.5zm6.5 0c-.5 0-1 .1-1.4.2 1 .8 1.4 1.9 1.4 3.3V16h5v-2c0-1.9-2.2-3.5-5-3.5z',
  user: 'M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z',
  check: 'M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z',
  x: 'M5.4 4L4 5.4 8.6 10 4 14.6 5.4 16l4.6-4.6 4.6 4.6 1.4-1.4-4.6-4.6L16 5.4 14.6 4 10 8.6z',
  lock: 'M6 8V6a4 4 0 118 0v2h1a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1h1zm2 0h4V6a2 2 0 10-4 0v2z',
  shield:
    'M10 2l6.5 2.5v5c0 4-2.8 7.4-6.5 8.5-3.7-1.1-6.5-4.5-6.5-8.5v-5L10 2zm-1 10.4l4.7-4.7-1.1-1.1L9 10.2 7.4 8.6l-1.1 1.1L9 12.4z',
  bolt: 'M11 1L3 11h6l-1 8 8-10h-6l1-8z',
}

const ICON = {
  home: svg(P.home),
  inbox: svg(P.inbox, 10),
  wallet: svg(P.wallet, 10),
  chart: svg(P.chart, 10),
  check: svg(P.check, 11),
  checkKpi: svg(P.check, 10),
  x: svg(P.x, 9),
  lock: svg(P.lock, 9),
  userSm: svg(P.user, 10),
  shield: svg(P.shield, 12),
  bolt: svg(P.bolt, 16),
  mail: '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="2.5" y="4" width="15" height="12" rx="2"/><path d="M3 5.5l7 5 7-5"/></svg>',
  whatsapp:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
}

const NAV = [svg(P.home), svg(P.inbox), svg(P.wallet), svg(P.chart), svg(P.users)]

const TONE = {
  sky: 'bg-sky-100 text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  slate: 'bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500',
}
type Tone = keyof typeof TONE

const fmtMZN = (n: number) => new Intl.NumberFormat('pt-MZ').format(n) + ' MT'

// Conteúdo dos elementos flutuantes à volta da janela, por variante
const IMG = (name: string) => `/images/hero/3d/${name}.png`
const GRADIENT_ICON =
  'bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 shadow-[0_6px_14px_-4px_rgba(99,102,241,0.6)]'

const FLOATS = {
  live: {
    topIcon: ICON.whatsapp,
    topIconClass: 'bg-[#25D366] shadow-[0_6px_14px_-4px_rgba(37,211,102,0.6)]',
    topLabel: 'Novo pedido · WhatsApp',
    topTitle: 'Combustível viatura',
    corner: IMG('check_mark_button'),
    bottomLeft: IMG('shield'),
    pill: 'Sessão protegida',
    bottomImg: IMG('chart_increasing'),
    bottomLabel: '✦ Relatório IA',
    bottomGradient: true,
    bottomTitle: 'Resumo do mês pronto',
  },
  setup: {
    topIcon: ICON.bolt,
    topIconClass: GRADIENT_ICON,
    topLabel: 'Registo guiado',
    topTitle: 'Pronto em menos de 2 min',
    corner: IMG('check_mark_button'),
    bottomLeft: IMG('locked'),
    pill: 'Verificação por OTP',
    bottomImg: IMG('shield'),
    bottomLabel: 'Permissões por perfil',
    bottomGradient: false,
    bottomTitle: 'Departamento e cargo',
  },
  recover: {
    topIcon: ICON.mail,
    topIconClass: GRADIENT_ICON,
    topLabel: 'Código enviado',
    topTitle: 'Por e-mail e SMS',
    corner: IMG('locked'),
    bottomLeft: IMG('shield'),
    pill: 'Verificação por OTP',
    bottomImg: IMG('check_mark_button'),
    bottomLabel: 'Auditoria',
    bottomGradient: false,
    bottomTitle: 'Cada passo fica registado',
  },
}
const F = computed(() => FLOATS[props.variant])

let timer: ReturnType<typeof setTimeout> | undefined
const later = (fn: () => void, ms: number) => {
  timer = setTimeout(fn, ms)
}

// ───────── Login ─────────
interface QueueItem {
  id: number
  requester: string
  initials: string
  dept: string
  description: string
  amount: number
  avatar: string
  approved?: boolean
  isNew?: boolean
}

const POOL: Omit<QueueItem, 'id'>[] = [
  {
    requester: 'Ana Macuácua',
    initials: 'AM',
    dept: 'Operações',
    description: 'Material de escritório',
    amount: 4_800,
    avatar: 'from-violet-500 to-fuchsia-500',
  },
  {
    requester: 'Pedro Sitoe',
    initials: 'PS',
    dept: 'Logística',
    description: 'Combustível viatura',
    amount: 12_500,
    avatar: 'from-sky-400 to-cyan-500',
  },
  {
    requester: 'Júlia Macamo',
    initials: 'JM',
    dept: 'RH',
    description: 'Reembolso viagem Maputo',
    amount: 8_200,
    avatar: 'from-emerald-400 to-teal-500',
  },
  {
    requester: 'Carlos Cossa',
    initials: 'CC',
    dept: 'TI',
    description: 'Cabos de rede',
    amount: 3_400,
    avatar: 'from-amber-400 to-orange-500',
  },
  {
    requester: 'Rita Chissano',
    initials: 'RC',
    dept: 'Comercial',
    description: 'Deslocação a cliente',
    amount: 2_500,
    avatar: 'from-rose-400 to-pink-500',
  },
]

let seq = 0
let poolIdx = 0
const fromPool = (isNew = false): QueueItem => ({
  ...POOL[poolIdx++ % POOL.length],
  id: ++seq,
  isNew,
})

const queue = ref<QueueItem[]>([fromPool(), fromPool(), fromPool()])
const pending = ref(7)
const approvedToday = ref(12)

const liveKpis = computed<{ label: string; value: string; tone: Tone; icon: string }[]>(() => [
  { label: 'Pedidos pendentes', value: String(pending.value), tone: 'sky', icon: ICON.inbox },
  {
    label: 'Aprovados hoje',
    value: String(approvedToday.value),
    tone: 'emerald',
    icon: ICON.checkKpi,
  },
  { label: 'Reembolsos', value: '23', tone: 'violet', icon: ICON.wallet },
])

// O primeiro pedido é aprovado, sai da fila e entra um novo no fim
function liveTick() {
  const first = queue.value[0]
  if (first) {
    first.approved = true
    pending.value--
    approvedToday.value++
  }
  later(() => {
    queue.value = [...queue.value.slice(1).map((q) => ({ ...q, isNew: false })), fromPool(true)]
    pending.value++
    later(liveTick, 2600)
  }, 1300)
}

// ───────── Registo ─────────
const SETUP_STEPS = [
  { title: 'Criar conta', hint: 'E-mail e palavra-passe' },
  { title: 'Verificar e-mail', hint: 'Código OTP' },
  { title: 'Completar perfil', hint: 'Departamento e cargo' },
  { title: 'Painel pronto', hint: 'Acesso ao fundo' },
]

const SETUP_KPIS: { label: string; tone: Tone; icon: string }[] = [
  { label: 'Pedidos', tone: 'sky', icon: ICON.inbox },
  { label: 'Aprovações', tone: 'emerald', icon: ICON.checkKpi },
  { label: 'Relatórios IA', tone: 'violet', icon: ICON.chart },
]

const autoDone = ref(0)
const done = computed(() =>
  props.step != null ? Math.max(0, Math.min(4, props.step - 1)) : autoDone.value,
)
const pct = computed(() => Math.round((done.value / 4) * 100))

function stateOf(i: number): 'done' | 'current' | 'todo' {
  if (i < done.value) return 'done'
  return i === done.value ? 'current' : 'todo'
}

function setupTick() {
  autoDone.value = autoDone.value >= 4 ? 0 : autoDone.value + 1
  later(setupTick, autoDone.value >= 4 ? 3200 : 1800)
}

// ───────── Recuperação ─────────
const RECOVER_STEPS = [
  { title: 'Identificar conta', hint: 'E-mail associado' },
  { title: 'Código OTP', hint: 'Por e-mail e SMS' },
  { title: 'Nova palavra-passe', hint: 'Validada em tempo real' },
  { title: 'Acesso reposto', hint: 'Sessão segura' },
]

const steps = computed(() => (props.variant === 'recover' ? RECOVER_STEPS : SETUP_STEPS))

function isLocked(i: number) {
  if (props.variant === 'setup') return i > done.value
  if (props.variant === 'recover') return i > 0 && done.value < 3
  return false
}

const OTP_DIGITS = ['4', '8', '2', '9', '1', '5']
const STRENGTH_LABELS = ['Por definir', 'Fraca', 'Razoável', 'Boa', 'Forte']
const PASSWORD_RULES = ['8+ caracteres', 'Número', 'Símbolo']

// Contadores em ciclo: o código "escreve-se" e a força da palavra-passe sobe, depois repetem
const otpStep = ref(0)
const strengthStep = ref(0)
const otpShown = computed(() =>
  done.value >= 2 ? 6 : done.value === 1 ? Math.min(6, otpStep.value) : 0,
)
const strengthShown = computed(() =>
  done.value >= 3 ? 4 : done.value === 2 ? Math.min(4, strengthStep.value) : 0,
)
const otpCaption = computed(() =>
  done.value >= 2 ? 'Validado' : done.value === 1 ? 'A verificar…' : 'Por enviar',
)

let micro: ReturnType<typeof setInterval> | undefined
function microTick() {
  otpStep.value = otpStep.value >= 10 ? 0 : otpStep.value + 1
  strengthStep.value = strengthStep.value >= 8 ? 0 : strengthStep.value + 1
}

let ro: ResizeObserver | null = null

onMounted(() => {
  if (wrapRef.value) {
    ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const byHeight = height > 0 ? height / CANVAS_H : Infinity
      scale.value = Math.round(Math.min(MAX_SCALE, width / CANVAS_W, byHeight) * 1000) / 1000
    })
    ro.observe(wrapRef.value)
  }
  if (reducedMotion) {
    if (props.step == null) autoDone.value = 2
    otpStep.value = 6
    strengthStep.value = 4
    return
  }
  if (props.variant === 'live') later(liveTick, 2200)
  else if (props.step == null) later(setupTick, 1500)
  if (props.variant === 'recover') micro = setInterval(microTick, 550)
})

onUnmounted(() => {
  clearTimeout(timer)
  clearInterval(micro)
  ro?.disconnect()
})
</script>

<style scoped>
.auth3d-canvas {
  position: relative;
  flex-shrink: 0;
  width: 600px;
  height: 440px;
}

.auth3d-glow {
  position: absolute;
  left: 50%;
  top: 46%;
  width: 520px;
  height: 380px;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  background: radial-gradient(
    closest-side,
    rgba(0, 242, 254, 0.28),
    rgba(139, 92, 246, 0.3) 55%,
    transparent 100%
  );
  filter: blur(34px);
  pointer-events: none;
}

.auth3d-rig {
  position: absolute;
  inset: 0;
  z-index: 1;
  perspective: 1400px;
  transform-style: preserve-3d;
}

/* ---------- Janela ---------- */
.dash {
  position: absolute;
  left: 70px;
  top: 56px;
  width: 460px;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #0f172a;
  background: #fff;
  transform: translateZ(0);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.14),
    0 40px 80px -28px rgba(2, 6, 23, 0.75);
}
.dark .dash {
  color: #f1f5f9;
  background: #0b1120;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 40px 80px -28px rgba(0, 0, 0, 0.85),
    0 0 60px -14px rgba(0, 242, 254, 0.4);
}

.dash-bar {
  height: 30px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}
.dark .dash-bar {
  background: #111827;
  border-color: rgba(255, 255, 255, 0.06);
}
.dash-dot {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
}
.dash-url {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 18px;
  padding: 0 10px;
  border-radius: 9999px;
  font-size: 9.5px;
  color: #64748b;
  background: #fff;
  border: 1px solid #e2e8f0;
}
.dark .dash-url {
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.06);
}
.dash-avatar {
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7.5px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #8b5cf6, #d946ef);
}

.dash-body {
  flex: 1;
  min-height: 0;
  display: flex;
}
.dash-side {
  width: 44px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-top: 10px;
  background: #f8fafc;
  border-right: 1px solid #eef2f7;
}
.dark .dash-side {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.06);
}
.dash-logo {
  width: 26px;
  height: 26px;
  margin-bottom: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #0ea5e9, #6366f1 55%, #8b5cf6);
}
.dash-nav {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition:
    opacity 0.4s ease,
    color 0.3s ease;
}
.dash-nav.is-active {
  color: #0284c7;
  background: rgba(14, 165, 233, 0.12);
}
.dark .dash-nav.is-active {
  color: #22d3ee;
  background: rgba(34, 211, 238, 0.12);
}
.dash-nav.is-locked {
  opacity: 0.3;
}

.dash-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 12px 14px;
}
.dash-muted {
  color: #64748b;
}
.dark .dash-muted {
  color: #94a3b8;
}
.dash-eyebrow {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
}
.dark .dash-eyebrow {
  color: #94a3b8;
}
.dash-live {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 9999px;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: sgfm-pulse 1.8s ease-in-out infinite;
}
.dash-title {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
}
.dash-chip {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  height: 17px;
  padding: 0 7px;
  border-radius: 9999px;
  font-size: 9px;
  font-weight: 600;
}

.dash-track {
  position: relative;
  margin-top: 5px;
  height: 6px;
  border-radius: 9999px;
  background: #e2e8f0;
}
.dark .dash-track {
  background: rgba(255, 255, 255, 0.08);
}
.dash-fill {
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(90deg, #0ea5e9, #6366f1, #8b5cf6);
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.45);
  transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.dash-min {
  position: absolute;
  top: -3px;
  width: 2px;
  height: 12px;
  border-radius: 2px;
  background: #f43f5e;
}

.dash-kpi {
  min-height: 48px;
  padding: 7px 8px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}
.dark .dash-kpi {
  border-color: rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.03);
}
.dash-kpi-label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 9px;
  color: #64748b;
}
.dark .dash-kpi-label {
  color: #94a3b8;
}
.dash-kpi-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}
.dash-kpi-value {
  margin-top: 3px;
  font-size: 15px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.dash-kpi-active {
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  font-weight: 600;
  color: #059669;
}
.dark .dash-kpi-active {
  color: #6ee7b7;
}
.dash-skeleton {
  margin-top: 8px;
  width: 70%;
  height: 9px;
  border-radius: 5px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: dash-shimmer 1.4s linear infinite;
}
.dark .dash-skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06) 25%,
    rgba(255, 255, 255, 0.13) 50%,
    rgba(255, 255, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}
@keyframes dash-shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

/* Lista de pedidos */
.dash-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dash-row {
  height: 30px;
  padding: 0 7px;
  display: flex;
  align-items: center;
  gap: 7px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #eef2f7;
  transition:
    background-color 0.4s ease,
    border-color 0.4s ease;
}
.dark .dash-row {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.05);
}
.dash-row.is-approved {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.35);
}
.dash-row-avatar {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7.5px;
  font-weight: 700;
  color: #fff;
}
.dash-row-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 10px;
  font-weight: 600;
}
.dash-row-meta {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 9px;
  color: #64748b;
}
.dark .dash-row-meta {
  color: #94a3b8;
}
.dash-row-amount {
  white-space: nowrap;
  font-size: 10px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.dash-btn {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dash-btn--ok {
  color: #047857;
  background: #d1fae5;
}
.dash-btn--no {
  color: #be123c;
  background: #ffe4e6;
}
.dark .dash-btn--ok {
  color: #6ee7b7;
  background: rgba(16, 185, 129, 0.15);
}
.dark .dash-btn--no {
  color: #fda4af;
  background: rgba(244, 63, 94, 0.15);
}

/* Passos do registo */
.dash-step {
  padding: 7px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  transition:
    border-color 0.4s ease,
    background-color 0.4s ease,
    box-shadow 0.4s ease;
}
.dark .dash-step {
  border-color: rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.03);
}
.dash-step.is-current {
  border-color: rgba(14, 165, 233, 0.5);
  background: rgba(14, 165, 233, 0.06);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.08);
}
.dark .dash-step.is-current {
  border-color: rgba(34, 211, 238, 0.45);
  background: rgba(34, 211, 238, 0.06);
}
.dash-step.is-done {
  border-color: rgba(16, 185, 129, 0.35);
}
.dash-step.is-todo {
  opacity: 0.7;
}
.dash-step-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  color: #94a3b8;
  background: #e2e8f0;
  transition: background-color 0.4s ease;
}
.dark .dash-step-icon {
  background: rgba(255, 255, 255, 0.08);
}
.is-done .dash-step-icon {
  color: #fff;
  background: #10b981;
}
.is-current .dash-step-icon {
  background: rgba(14, 165, 233, 0.15);
}
.dash-step-pulse {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: #0ea5e9;
  animation: dash-pulse 1.4s ease-out infinite;
}
@keyframes dash-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.55);
  }
  100% {
    box-shadow: 0 0 0 8px rgba(14, 165, 233, 0);
  }
}

/* Recuperação: código OTP e força da palavra-passe */
.dash-otp {
  margin-top: 6px;
  display: flex;
  gap: 6px;
}
.dash-otp-box {
  width: 26px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: #fff;
  border: 1px solid #e2e8f0;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}
.dark .dash-otp-box {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
}
.dash-otp-box.is-filled {
  border-color: rgba(14, 165, 233, 0.6);
}
.dash-otp-box.is-valid {
  color: #059669;
  border-color: rgba(16, 185, 129, 0.6);
  background: rgba(16, 185, 129, 0.08);
}
.dark .dash-otp-box.is-valid {
  color: #6ee7b7;
}
.dash-strength {
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}
.dash-strength-bar {
  height: 5px;
  border-radius: 9999px;
  background: #e2e8f0;
  transition: background-color 0.4s ease;
}
.dark .dash-strength-bar {
  background: rgba(255, 255, 255, 0.08);
}
.dash-strength-bar.lvl-1 {
  background: #fb7185;
}
.dash-strength-bar.lvl-2 {
  background: #fbbf24;
}
.dash-strength-bar.lvl-3 {
  background: #0ea5e9;
}
.dash-strength-bar.lvl-4 {
  background: #10b981;
}
.str-1 {
  color: #e11d48;
}
.str-2 {
  color: #d97706;
}
.str-3 {
  color: #0284c7;
}
.str-4 {
  color: #059669;
}
.dark .str-4 {
  color: #6ee7b7;
}
.dash-rule {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 9px;
  color: #94a3b8;
  transition: color 0.3s ease;
}
.dash-rule.is-ok {
  color: #059669;
}
.dark .dash-rule.is-ok {
  color: #6ee7b7;
}

.dash-note {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 9px;
  color: #64748b;
}
.dash-note > span {
  color: #0ea5e9;
}
.dark .dash-note {
  color: #94a3b8;
}

.dash-swap {
  animation: dash-swap 0.4s ease both;
}
@keyframes dash-swap {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.dq-enter-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.dq-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
/* A linha aprovada desliza e encolhe: as de baixo sobem sem se sobreporem */
.dq-leave-active {
  overflow: hidden;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    height 0.4s ease 0.1s,
    margin 0.4s ease 0.1s,
    border-width 0.4s ease 0.1s;
}
.dq-leave-to {
  opacity: 0;
  transform: translateX(-16px);
  height: 0;
  margin-bottom: -4px;
  border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dash-live,
  .dash-skeleton,
  .dash-step-pulse,
  .dash-swap {
    animation: none;
  }
}
</style>
