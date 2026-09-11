<template>
  <div
    ref="stageRef"
    class="hero3d relative mx-auto w-full max-w-5xl h-[420px] sm:h-[520px] lg:h-[580px] select-none"
    :style="{ '--mx': pointer.x, '--my': pointer.y }"
    aria-hidden="true"
  >
    <div class="hero3d-glow"></div>

    <!-- Moeda desfocada ao fundo — dá profundidade de campo -->
    <div
      class="sgfm-parallax sgfm-parallax--back left-[8%] md:left-[18%] top-[62%] lg:top-[68%]"
      style="--d: 6"
    >
      <div class="sgfm-bob" style="--dur: 7s; --delay: -2s; --rot: -18deg">
        <img
          src="/images/hero/3d/coin.png"
          alt=""
          width="44"
          height="44"
          draggable="false"
          class="sgfm-3d-obj w-9 md:w-11 blur-[1.5px] opacity-90"
        />
      </div>
    </div>

    <!-- Palco 3D: órbitas + telemóvel partilham o mesmo contexto 3D,
         por isso a órbita passa à frente e por trás do telemóvel -->
    <div class="hero3d-rig">
      <div class="sgfm-orbit sgfm-orbit--outer" style="--os: 820px; --oy: 330px">
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
      <div class="sgfm-orbit sgfm-orbit--inner" style="--os: 560px; --oy: 350px">
        <div class="sgfm-orbit-spin sgfm-orbit-spin--rev">
          <span class="sgfm-orbit-sat sgfm-orbit-dot"></span>
        </div>
      </div>

      <div class="phone-shadow"></div>

      <!-- Telemóvel fixo, sempre de frente -->
      <div class="phone">
        <div class="phone-front">
          <div class="phone-screen">
            <!-- Barra de estado -->
            <div class="wa-status">
              <span>14:32</span>
              <span class="flex items-center gap-1">
                <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
                  <rect x="0" y="7" width="2.6" height="3" rx=".6" />
                  <rect x="4" y="5" width="2.6" height="5" rx=".6" />
                  <rect x="8" y="2.5" width="2.6" height="7.5" rx=".6" />
                  <rect x="12" y="0" width="2.6" height="10" rx=".6" />
                </svg>
                <svg width="13" height="10" viewBox="0 0 16 12" fill="currentColor">
                  <path
                    d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.4 10.4 0 008 .2 10.4 10.4 0 00.7 3.2L2 4.6a8.4 8.4 0 016-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.9 6.9 0 008 3.8a6.9 6.9 0 00-4.7 1.9l1.3 1.4A4.9 4.9 0 018 5.8zm0 3.4a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"
                  />
                </svg>
                <svg width="22" height="10" viewBox="0 0 24 11">
                  <rect
                    x=".5"
                    y=".5"
                    width="20"
                    height="10"
                    rx="3"
                    fill="none"
                    stroke="currentColor"
                    opacity=".45"
                  />
                  <rect x="2" y="2" width="15" height="7" rx="1.6" fill="currentColor" />
                  <rect
                    x="21.5"
                    y="3.5"
                    width="1.8"
                    height="4"
                    rx=".9"
                    fill="currentColor"
                    opacity=".45"
                  />
                </svg>
              </span>
            </div>

            <!-- Cabeçalho da conversa -->
            <div class="wa-head">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.7 4.3L7 10l5.7 5.7-1.4 1.4L4.2 10l7.1-7.1z" />
              </svg>
              <div class="wa-avatar">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="7" width="2.6" height="7" rx="1.2" />
                  <rect x="6.7" y="3" width="2.6" height="11" rx="1.2" />
                  <rect x="11.4" y="5.5" width="2.6" height="8.5" rx="1.2" />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1 font-semibold text-[11.5px] leading-tight">
                  SGFM Assistente
                  <svg width="11" height="11" viewBox="0 0 20 20">
                    <path
                      fill="#00a884"
                      d="M10 1l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L10 19l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z"
                    />
                    <path fill="#fff" d="M8.6 12.6L6 10l-1 1 3.6 3.6L15 8.2l-1-1z" />
                  </svg>
                </div>
                <div
                  class="text-[9.5px] leading-tight transition-colors"
                  :style="{ color: typing ? 'var(--wa-accent)' : 'var(--wa-muted)' }"
                >
                  {{ typing ? 'a escrever…' : 'online' }}
                </div>
              </div>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M3 5h9a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm11 3.2L18 6v8l-4-2.2V8.2z"
                />
              </svg>
              <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M6.6 2.5l2 3.6-1.5 1.6c.9 1.9 2.3 3.3 4.2 4.2l1.6-1.5 3.6 2-1 2.9c-.2.5-.7.8-1.2.7C8.2 15.3 4.7 11.8 4 5.7c-.1-.5.2-1 .7-1.2l1.9-2z"
                />
              </svg>
            </div>

            <!-- Conversa -->
            <div class="wa-body">
              <div :class="['wa-stack', { 'is-fading': fading }]">
                <TransitionGroup name="wa" tag="div" class="wa-list">
                  <div
                    v-for="m in messages"
                    :key="m.id"
                    :class="[
                      'wa-row',
                      m.kind === 'out' || m.kind === 'receipt' ? 'wa-row--out' : '',
                    ]"
                  >
                    <div v-if="m.kind === 'approval'" class="wa-bubble wa-in wa-approval">
                      <div class="flex items-center gap-2">
                        <span class="wa-approval-icon">
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z" />
                          </svg>
                        </span>
                        <div>
                          <div class="font-semibold">Pedido aprovado</div>
                          <div class="text-[9.5px]" style="color: var(--wa-muted)">
                            Ana M. · Gestora Comercial
                          </div>
                        </div>
                      </div>
                      <div class="wa-approval-meta">
                        <span>#1043 · Táxi</span>
                        <b>2 500 MT</b>
                      </div>
                      <span class="wa-meta">{{ m.time }}</span>
                    </div>

                    <div v-else-if="m.kind === 'receipt'" class="wa-bubble wa-out wa-receipt">
                      <div class="wa-receipt-img">
                        <div class="wa-receipt-paper">
                          <span style="width: 70%"></span>
                          <span style="width: 90%"></span>
                          <span style="width: 55%"></span>
                          <b>2 500,00</b>
                        </div>
                      </div>
                      <div class="mt-1">Recibo do táxi</div>
                      <span class="wa-meta">
                        {{ m.time }}
                        <svg
                          class="wa-ticks"
                          width="14"
                          height="9"
                          viewBox="0 0 18 11"
                          fill="currentColor"
                        >
                          <path
                            d="M12.4.6L5.6 8.4 2.3 5.3 1.1 6.6l4.6 4.3L13.8 1.8zM16.8.6l-6.8 7.8-.8-.7-1.2 1.3 2.1 1.9L18.2 1.8z"
                          />
                        </svg>
                      </span>
                    </div>

                    <div v-else :class="['wa-bubble', m.kind === 'out' ? 'wa-out' : 'wa-in']">
                      {{ m.text }}
                      <span class="wa-meta">
                        {{ m.time }}
                        <svg
                          v-if="m.kind === 'out'"
                          class="wa-ticks"
                          width="14"
                          height="9"
                          viewBox="0 0 18 11"
                          fill="currentColor"
                        >
                          <path
                            d="M12.4.6L5.6 8.4 2.3 5.3 1.1 6.6l4.6 4.3L13.8 1.8zM16.8.6l-6.8 7.8-.8-.7-1.2 1.3 2.1 1.9L18.2 1.8z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </TransitionGroup>
                <!-- Fora do TransitionGroup: sai de imediato quando chega a resposta -->
                <div v-if="typing" class="wa-row wa-typing-row">
                  <div class="wa-bubble wa-in wa-typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Caixa de mensagem -->
            <div class="wa-input">
              <div class="wa-field">
                <span class="flex-1">Mensagem</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                >
                  <path
                    d="M13.5 6.5l-5.8 5.8a1.6 1.6 0 002.3 2.3l6-6a3.2 3.2 0 00-4.5-4.5l-6.2 6.2a4.8 4.8 0 006.8 6.8l5-5"
                  />
                </svg>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  fill-rule="evenodd"
                >
                  <path
                    d="M7 3h6l1.2 2H17a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1h2.8L7 3zm3 4a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 1.6a1.9 1.9 0 110 3.8 1.9 1.9 0 010-3.8z"
                  />
                </svg>
              </div>
              <div class="wa-mic">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10 2a3 3 0 013 3v5a3 3 0 01-6 0V5a3 3 0 013-3zm-5.5 8h1.6a3.9 3.9 0 007.8 0h1.6a5.5 5.5 0 01-4.7 5.4V18H9.2v-2.6A5.5 5.5 0 014.5 10z"
                  />
                </svg>
              </div>
            </div>
            <div class="wa-home"></div>
          </div>

          <div class="phone-island"></div>
          <div class="phone-glare"></div>
        </div>
      </div>
    </div>

    <!-- Notas voadoras -->
    <div class="sgfm-parallax left-[2%] md:left-[21%] lg:left-[24%] top-[4%]" style="--d: 28">
      <div class="sgfm-bob" style="--dur: 6.5s; --delay: -1s; --rot: -10deg">
        <img
          src="/images/hero/3d/money_with_wings.png"
          alt=""
          width="84"
          height="84"
          draggable="false"
          class="sgfm-3d-obj w-14 md:w-[76px] lg:w-[84px]"
        />
      </div>
    </div>

    <!-- Cartão: novo pedido via WhatsApp -->
    <div
      class="sgfm-parallax hidden md:block left-0 lg:left-[1%] top-[26%] lg:top-[22%]"
      style="--d: 16"
    >
      <div class="sgfm-bob" style="--dur: 6s; --delay: -3s">
        <div class="sgfm-float-card w-[200px] lg:w-[228px]">
          <div class="flex items-center gap-2.5">
            <span
              class="h-9 w-9 shrink-0 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-[0_6px_14px_-4px_rgba(37,211,102,0.6)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                />
              </svg>
            </span>
            <div class="min-w-0">
              <div class="text-[11px] text-slate-500 dark:text-slate-400">
                Novo pedido · WhatsApp
              </div>
              <div class="text-[13px] font-semibold text-slate-900 dark:text-white truncate">
                Táxi – reunião com cliente
              </div>
            </div>
          </div>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
              2 500 MT
            </span>
            <span
              class="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-300"></span>
              A aguardar
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pill: suporte 24/7 -->
    <div class="sgfm-parallax hidden lg:block left-[7%] top-[56%]" style="--d: 12">
      <div class="sgfm-bob" style="--dur: 5.5s; --delay: -4s">
        <div class="sgfm-float-card sgfm-float-pill">
          <span class="sgfm-ticker-dot"></span>
          Suporte 24/7
        </div>
      </div>
    </div>

    <!-- Moeda em primeiro plano -->
    <div class="sgfm-parallax left-[10%] md:left-[27%] lg:left-[29%] bottom-[6%]" style="--d: 44">
      <div class="sgfm-bob" style="--dur: 7.5s; --delay: -2.5s; --rot: 12deg">
        <img
          src="/images/hero/3d/coin.png"
          alt=""
          width="104"
          height="104"
          draggable="false"
          class="sgfm-3d-obj w-16 md:w-24 lg:w-[104px]"
        />
      </div>
    </div>

    <!-- Visto 3D isolado (só telemóvel — no desktop está no cartão) -->
    <div class="sgfm-parallax md:hidden right-[3%] top-[8%]" style="--d: 20">
      <div class="sgfm-bob" style="--dur: 6s; --delay: -1.5s; --rot: 8deg">
        <img
          src="/images/hero/3d/check_mark_button.png"
          alt=""
          width="48"
          height="48"
          draggable="false"
          class="sgfm-3d-obj w-12"
        />
      </div>
    </div>

    <!-- Cartão: aprovado -->
    <div
      class="sgfm-parallax hidden md:block right-0 lg:right-[1%] top-[8%] lg:top-[9%]"
      style="--d: 22"
    >
      <div class="sgfm-bob" style="--dur: 7s; --delay: -0.5s">
        <div class="sgfm-float-card relative w-[210px] lg:w-[224px]">
          <img
            src="/images/hero/3d/check_mark_button.png"
            alt=""
            width="64"
            height="64"
            draggable="false"
            class="sgfm-3d-obj absolute -left-6 -top-7 w-14 lg:w-16"
          />
          <div class="pl-9 lg:pl-10">
            <div class="text-[13px] font-semibold text-slate-900 dark:text-white">
              Aprovado em 3 min
            </div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">
              Ana M. · Gestora Comercial
            </div>
          </div>
          <div
            class="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400"
          >
            <span class="flow-dot"></span>Pedido
            <span class="flow-line"></span>
            <span class="flow-dot"></span>Gestor
            <span class="flow-line"></span>
            <span class="flow-dot"></span>Enviado
          </div>
        </div>
      </div>
    </div>

    <!-- Escudo 3D -->
    <div
      class="sgfm-parallax right-[4%] md:right-[22%] lg:right-[26%] top-[40%] md:top-[44%]"
      style="--d: 34"
    >
      <div class="sgfm-bob" style="--dur: 6.8s; --delay: -3.5s; --rot: 8deg">
        <img
          src="/images/hero/3d/shield.png"
          alt=""
          width="72"
          height="72"
          draggable="false"
          class="sgfm-3d-obj w-12 md:w-16 lg:w-[72px]"
        />
      </div>
    </div>

    <!-- Cartão: previsão IA -->
    <div class="sgfm-parallax hidden lg:block right-[2%] bottom-[14%]" style="--d: 14">
      <div class="sgfm-bob" style="--dur: 6.2s; --delay: -2s">
        <div class="sgfm-float-card w-[236px]">
          <div class="flex items-center gap-2.5">
            <img
              src="/images/hero/3d/chart_increasing.png"
              alt=""
              width="40"
              height="40"
              draggable="false"
              class="sgfm-3d-obj w-10 h-10 shrink-0"
            />
            <div class="min-w-0">
              <div class="text-[11px] font-semibold sgfm-gradient-text">✦ Previsão IA</div>
              <div class="text-[13px] font-semibold text-slate-900 dark:text-white leading-snug">
                Reposição sugerida em 6 dias
              </div>
            </div>
          </div>
          <svg viewBox="0 0 200 44" class="mt-2 w-full h-10" preserveAspectRatio="none">
            <defs>
              <linearGradient id="h3d-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="h3d-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stop-color="#0ea5e9" />
                <stop offset="100%" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="34"
              x2="200"
              y2="34"
              stroke="#f43f5e"
              stroke-opacity="0.45"
              stroke-width="1"
              stroke-dasharray="2 3"
            />
            <path
              d="M0 8 C 18 6, 30 12, 48 11 S 78 16, 96 15 S 124 22, 140 22 L 140 44 L 0 44 Z"
              fill="url(#h3d-area)"
            />
            <path
              d="M0 8 C 18 6, 30 12, 48 11 S 78 16, 96 15 S 124 22, 140 22"
              fill="none"
              stroke="url(#h3d-line)"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M140 22 S 175 30, 200 38"
              fill="none"
              stroke="#8b5cf6"
              stroke-width="2"
              stroke-dasharray="3 3"
              stroke-linecap="round"
            />
            <circle cx="140" cy="22" r="3.5" fill="#fff" stroke="#8b5cf6" stroke-width="2" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePointerParallax } from '@/composables/landingEffects'

type ChatKind = 'in' | 'out' | 'approval' | 'receipt'

interface ChatMsg {
  id: number
  kind: ChatKind
  text?: string
  time?: string
}

interface ScriptStep {
  wait: number
  kind: ChatKind | 'typing'
  text?: string
  time?: string
}

// Conversa de exemplo: pedido → aprovação → envio → comprovativo
const SCRIPT: ScriptStep[] = [
  {
    wait: 700,
    kind: 'out',
    text: 'Olá! Preciso de 2 500 MT para táxi — reunião com cliente na Baixa.',
    time: '14:29',
  },
  { wait: 800, kind: 'typing' },
  {
    wait: 1400,
    kind: 'in',
    text: 'Pedido #1043 registado. Já foi enviado ao seu gestor para aprovação.',
    time: '14:29',
  },
  { wait: 900, kind: 'typing' },
  { wait: 1600, kind: 'approval', time: '14:32' },
  { wait: 900, kind: 'typing' },
  {
    wait: 1300,
    kind: 'in',
    text: 'Os 2 500 MT foram enviados para a sua carteira móvel. Envie o recibo quando concluir.',
    time: '14:32',
  },
  { wait: 1900, kind: 'receipt', time: '15:10' },
  { wait: 800, kind: 'typing' },
  {
    wait: 1300,
    kind: 'in',
    text: 'Comprovativo validado. Pedido #1043 concluído.',
    time: '15:10',
  },
]

const stageRef = ref<HTMLElement | null>(null)
// O cursor desloca os objectos flutuantes por camadas; o telemóvel fica fixo
const pointer = usePointerParallax(stageRef)
const messages = ref<ChatMsg[]>([])
const fading = ref(false)
const typing = ref(false)

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const toMsg = (s: ScriptStep, id: number): ChatMsg => ({
  id,
  kind: s.kind as ChatKind,
  text: s.text,
  time: s.time,
})

let seq = 0
let step = 0
let timer: ReturnType<typeof setTimeout> | undefined

function push(s: ScriptStep) {
  if (s.kind === 'typing') {
    typing.value = true
    return
  }
  typing.value = false
  messages.value = [...messages.value, toMsg(s, ++seq)].slice(-6)
}

function runScript() {
  if (step >= SCRIPT.length) {
    timer = setTimeout(() => {
      fading.value = true
      timer = setTimeout(() => {
        messages.value = []
        fading.value = false
        step = 0
        runScript()
      }, 600)
    }, 4500)
    return
  }
  const s = SCRIPT[step++]
  timer = setTimeout(() => {
    push(s)
    runScript()
  }, s.wait)
}

onMounted(() => {
  if (reducedMotion) {
    messages.value = SCRIPT.filter((s) => s.kind !== 'typing')
      .slice(-5)
      .map((s, i) => toMsg(s, i))
    return
  }
  runScript()
})

onUnmounted(() => clearTimeout(timer))
</script>

<style scoped>
.hero3d {
  --mx: 0;
  --my: 0;
}

/* ---------- Brilho de fundo ---------- */
.hero3d-glow {
  position: absolute;
  left: 50%;
  top: 42%;
  width: 560px;
  height: 420px;
  max-width: 100%;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  background: radial-gradient(
    closest-side,
    rgba(56, 189, 248, 0.35),
    rgba(139, 92, 246, 0.22) 55%,
    transparent 100%
  );
  filter: blur(30px);
  pointer-events: none;
}
.dark .hero3d-glow {
  background: radial-gradient(
    closest-side,
    rgba(0, 242, 254, 0.26),
    rgba(139, 92, 246, 0.3) 55%,
    transparent 100%
  );
}

/* ---------- Palco 3D ---------- */
.hero3d-rig {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 8px;
  width: 248px;
  height: 500px;
  margin-left: -124px;
  perspective: 1500px;
  transform-style: preserve-3d;
  /* zoom (e não scale) para o texto do ecrã continuar nítido em ecrãs menores */
  zoom: 0.7;
}
@media (min-width: 640px) {
  .hero3d-rig {
    zoom: 0.88;
  }
}
@media (min-width: 1024px) {
  .hero3d-rig {
    zoom: 1;
  }
}

/* Sombra no chão */
.phone-shadow {
  position: absolute;
  left: 50%;
  top: 478px;
  width: 300px;
  height: 70px;
  margin-left: -150px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(15, 23, 42, 0.35), transparent);
  filter: blur(6px);
  transform: translateZ(-40px);
}
.dark .phone-shadow {
  background: radial-gradient(closest-side, rgba(0, 242, 254, 0.3), transparent);
}

/* ---------- Telemóvel (fixo, sempre de frente) ---------- */
.phone {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

/* Aro duplo = moldura metálica; a sombra projectada dá-lhe volume sem o inclinar */
.phone-front {
  position: absolute;
  inset: 0;
  border-radius: 42px;
  padding: 9px;
  background: #05070d;
  transform: translateZ(1px);
  box-shadow:
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.08),
    0 0 0 1.5px #94a3b8,
    0 0 0 4px #e2e8f0,
    0 40px 70px -30px rgba(15, 23, 42, 0.45);
}
.dark .phone-front {
  box-shadow:
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.08),
    0 0 0 1.5px #475569,
    0 0 0 4px #1e293b,
    0 0 60px -12px rgba(0, 242, 254, 0.5);
}

.phone-island {
  position: absolute;
  top: 17px;
  left: 50%;
  width: 74px;
  height: 21px;
  margin-left: -37px;
  border-radius: 9999px;
  background: #000;
}

.phone-glare {
  position: absolute;
  inset: 9px;
  border-radius: 34px;
  pointer-events: none;
  background: linear-gradient(
    118deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.05) 24%,
    transparent 40%
  );
}
.dark .phone-glare {
  background: linear-gradient(
    118deg,
    rgba(255, 255, 255, 0.09) 0%,
    rgba(255, 255, 255, 0.03) 24%,
    transparent 40%
  );
}

/* ---------- Ecrã (estilo WhatsApp, segue o tema) ---------- */
.phone-screen {
  --wa-bg: #eef2f6;
  --wa-head: #ffffff;
  --wa-in: #ffffff;
  --wa-out: #d9fdd3;
  --wa-text: #0f172a;
  --wa-muted: #64748b;
  --wa-line: rgba(15, 23, 42, 0.06);
  --wa-dotbg: rgba(100, 116, 139, 0.13);
  --wa-accent: #00a884;

  position: relative;
  height: 100%;
  border-radius: 34px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--wa-bg);
  color: var(--wa-text);
  text-align: left;
  font-size: 11px;
  line-height: 1.35;
}
.dark .phone-screen {
  --wa-bg: #0b141a;
  --wa-head: #1f2c34;
  --wa-in: #202c33;
  --wa-out: #005c4b;
  --wa-text: #e9edef;
  --wa-muted: #8696a0;
  --wa-line: rgba(255, 255, 255, 0.06);
  --wa-dotbg: rgba(255, 255, 255, 0.05);
}

.wa-status {
  height: 36px;
  padding: 0 20px 4px 26px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 10.5px;
  font-weight: 600;
  background: var(--wa-head);
}

.wa-head {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px 8px 10px;
  background: var(--wa-head);
  border-bottom: 1px solid var(--wa-line);
}
.wa-avatar {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #0ea5e9, #6366f1 55%, #8b5cf6);
}

.wa-body {
  position: relative;
  flex: 1;
  overflow: hidden;
  background-image: radial-gradient(var(--wa-dotbg) 1px, transparent 1.2px);
  background-size: 14px 14px;
}
.wa-stack {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 9px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: opacity 0.5s ease;
}
.wa-stack.is-fading {
  opacity: 0;
}
.wa-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
/* Cresce em altura: a conversa sobe suavemente em vez de saltar */
.wa-typing-row {
  overflow: hidden;
  animation: wa-typing-in 0.3s ease both;
}
@keyframes wa-typing-in {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 32px;
    opacity: 1;
  }
}

.wa-row {
  display: flex;
  transform-origin: bottom left;
}
.wa-row--out {
  justify-content: flex-end;
  transform-origin: bottom right;
}

.wa-bubble {
  position: relative;
  max-width: 84%;
  padding: 6px 8px 5px;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(15, 23, 42, 0.08);
}
.wa-in {
  background: var(--wa-in);
  border-top-left-radius: 3px;
}
.wa-out {
  background: var(--wa-out);
  border-top-right-radius: 3px;
}
.wa-meta {
  float: right;
  margin: 5px 0 -2px 8px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 8.5px;
  color: var(--wa-muted);
}
.wa-ticks {
  color: #53bdeb;
}

.wa-typing {
  display: inline-flex;
  gap: 3px;
  padding: 9px 10px;
}
.wa-typing span {
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: var(--wa-muted);
  animation: wa-dot 1.1s infinite ease-in-out;
}
.wa-typing span:nth-child(2) {
  animation-delay: 0.15s;
}
.wa-typing span:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes wa-dot {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }
  30% {
    transform: translateY(-3px);
    opacity: 1;
  }
}

.wa-approval {
  min-width: 160px;
  border-left: 3px solid #10b981;
}
.wa-approval-icon {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #10b981;
}
.wa-approval-meta {
  margin-top: 6px;
  padding: 4px 6px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 9.5px;
  background: rgba(16, 185, 129, 0.12);
}

.wa-receipt {
  padding: 4px 4px 5px;
}
.wa-receipt > div:not(.wa-receipt-img) {
  padding: 0 4px;
}
.wa-receipt-img {
  width: 148px;
  height: 60px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #94a3b8, #cbd5e1);
}
.dark .wa-receipt-img {
  background: linear-gradient(135deg, #1e293b, #334155);
}
.wa-receipt-paper {
  width: 46px;
  height: 50px;
  padding: 5px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: #fff;
  transform: rotate(-6deg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.wa-receipt-paper span {
  display: block;
  height: 3px;
  border-radius: 2px;
  background: #cbd5e1;
}
.wa-receipt-paper b {
  margin-top: auto;
  font-size: 6.5px;
  text-align: right;
  color: #0f172a;
}

.wa-input {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 7px 4px;
}
.wa-field {
  flex: 1;
  height: 28px;
  padding: 0 9px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--wa-muted);
  background: var(--wa-in);
  box-shadow: 0 1px 1px rgba(15, 23, 42, 0.06);
}
.wa-mic {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: var(--wa-accent);
}
.wa-home {
  width: 84px;
  height: 4px;
  margin: 5px auto 7px;
  border-radius: 9999px;
  background: var(--wa-text);
  opacity: 0.35;
}

.wa-enter-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.wa-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}
.wa-move {
  transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Mini-fluxo do cartão "Aprovado" (cartões, ícones 3D e órbitas: estilos globais em main.css) */
.flow-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 9999px;
  background: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.18);
}
.flow-line {
  flex: 1;
  height: 1.5px;
  min-width: 6px;
  border-radius: 2px;
  background: linear-gradient(90deg, #10b981, #34d399);
}
</style>
