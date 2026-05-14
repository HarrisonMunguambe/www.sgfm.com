<template>
  <section id="faq" class="relative py-24 overflow-hidden">
    <div
      class="absolute top-1/2 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 bg-sky-300 dark:bg-cyan-500/25 sgfm-float pointer-events-none"
    ></div>
    <div
      class="absolute bottom-10 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 bg-violet-300 dark:bg-violet-500/20 sgfm-float pointer-events-none"
      style="animation-delay: 1.8s"
    ></div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <p
          class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase sgfm-rise"
        >
          Perguntas Frequentes
        </p>
        <h2
          class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white sgfm-rise delay-1"
        >
          Ainda tem <span class="sgfm-gradient-text">dúvidas?</span>
        </h2>
        <p
          class="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg sgfm-rise delay-2"
        >
          Reunimos as perguntas mais comuns sobre o SGFM. Se mesmo assim não encontrar resposta, a
          nossa equipa está pronta para ajudar.
        </p>
      </div>

      <div class="space-y-3">
        <CardGlass
          v-for="(item, i) in faqs"
          :key="item.q"
          hover
          :class="['overflow-hidden sgfm-rise', `delay-${Math.min(i + 1, 4)}`]"
        >
          <button
            type="button"
            @click="toggle(i)"
            :aria-expanded="open === i"
            :aria-controls="`faq-panel-${i}`"
            class="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
          >
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <span
                :class="[
                  'shrink-0 h-9 w-9 rounded-lg flex items-center justify-center text-sm font-bold tabular-nums transition-colors',
                  open === i
                    ? 'bg-gradient-to-br from-sky-500 to-violet-500 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300',
                ]"
              >
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <h3
                :class="[
                  'text-base sm:text-lg font-semibold transition-colors',
                  open === i
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-800 dark:text-slate-100',
                ]"
              >
                {{ item.q }}
              </h3>
            </div>
            <span
              :class="[
                'shrink-0 h-9 w-9 rounded-full flex items-center justify-center border transition-all duration-300',
                open === i
                  ? 'rotate-45 border-sky-300 bg-sky-50 text-sky-600 dark:border-cyan-300/40 dark:bg-cyan-500/10 dark:text-cyan-300'
                  : 'border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400',
              ]"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 3h2v6h6v2h-6v6H9v-6H3V9h6V3z" />
              </svg>
            </span>
          </button>

          <div :class="['faq-content', { open: open === i }]">
            <div class="faq-content-inner">
              <div
                :id="`faq-panel-${i}`"
                class="px-5 sm:px-6 pb-6 pt-0 pl-[76px] sm:pl-[88px] text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                <p v-for="(p, pi) in item.a" :key="pi" :class="pi > 0 ? 'mt-3' : ''">
                  {{ p }}
                </p>
              </div>
            </div>
          </div>
        </CardGlass>
      </div>

      <div
        class="mt-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-sky-50 to-violet-50 dark:from-cyan-500/5 dark:to-violet-500/5 border border-slate-200/70 dark:border-white/10 sgfm-rise delay-4"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
          <div class="flex-1">
            <h3 class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
              Não encontrou a sua resposta?
            </h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
              A nossa equipa de suporte está disponível para ajudar a sua organização a tirar o
              máximo do SGFM.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a
              href="mailto:suporte@sgfm.co.mz"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-100 hover:border-sky-300 dark:hover:border-cyan-300/40 hover:-translate-y-0.5 transition"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="#0ea5e9">
                <path
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0l6 4 6-4H4zm12 2.2l-5.4 3.6a1 1 0 01-1.2 0L4 7.2V15h12V7.2z"
                />
              </svg>
              suporte@sgfm.co.mz
            </a>
            <a
              href="tel:+258833478649"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 transition"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2 4a2 2 0 012-2h2.3a1 1 0 011 .8l1 4a1 1 0 01-.3 1L7 9.1a10 10 0 003.9 3.9l1.4-1a1 1 0 011-.3l4 1a1 1 0 01.8 1V16a2 2 0 01-2 2h-1A14 14 0 012 5V4z"
                />
              </svg>
              +258 83 347 8649
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'

const open = ref<number | null>(0)

function toggle(i: number) {
  open.value = open.value === i ? null : i
}

const faqs = [
  {
    q: 'Como faço para criar uma conta no SGFM?',
    a: [
      'O registo é feito em três passos simples. Primeiro, informe o seu e-mail, número de telemóvel e crie uma senha, aceitando os termos e condições.',
      'De seguida, receberá um código OTP por e-mail e SMS insira-o para verificar a sua identidade.',
      'Por fim, preencha o seu nome, departamento e cargo na empresa. Após concluir estes passos, a sua conta fica activa e pronta para usar.',
    ],
  },
  {
    q: 'Quem pode aprovar um pedido de fundo de maneio?',
    a: [
      'As aprovações são feitas por pessoas com permissão específica no sistema. O Fiel de Caixa é o responsável pela gestão diária do fundo e a primeira linha de aprovação. O Director Financeiro aprova valores mais altos ou reabastecimentos do fundo.',
      'O colaborador comum apenas solicita os valores, mas não aprova. O histórico de cada aprovação fica registado para auditoria, com data, autor e motivo.',
    ],
  },
  {
    q: 'Posso fazer pedidos pelo WhatsApp?',
    a: [
      'Sim, o SGFM permite pedidos multicanal. Pode submeter um pedido directamente pelo painel web ou através do WhatsApp envia uma mensagem e o sistema regista automaticamente.',
      'Os pedidos vindos do WhatsApp seguem o mesmo fluxo de aprovação e ficam visíveis no histórico do colaborador, com a mesma rastreabilidade.',
    ],
  },
  {
    q: 'Como funciona a prestação de contas?',
    a: [
      'Após o pedido ser aprovado e o valor utilizado, o colaborador acede ao pedido no sistema e anexa os comprovativos da despesa, em foto ou PDF.',
      'O Fiel de Caixa ou Director Financeiro pode visualizar todos os comprovativos anexados, garantindo uma trilha de auditoria completa e transparência total sobre o uso do fundo de maneio.',
    ],
  },
  {
    q: 'O SGFM gera relatórios automáticos?',
    a: [
      'Sim. O sistema disponibiliza relatórios prontos para apoiar a gestão financeira: relatório mensal de gastos por colaborador, departamento ou categoria; histórico completo de pedidos com os respectivos estados; evolução do saldo do fundo ao longo do tempo; e lista de comprovativos anexados para auditoria.',
      'Todos os relatórios podem ser exportados em PDF ou Excel com um único clique.',
    ],
  },
  {
    q: 'É seguro? Os meus dados estão protegidos?',
    a: [
      'Sim. O SGFM foi desenvolvido com várias camadas de segurança: autenticação por token com sessões únicas e expiráveis, criptografia das senhas (nunca armazenadas em texto puro), reCAPTCHA a proteger as rotas públicas contra bots, e SSL em toda a comunicação entre o navegador e o servidor.',
      'A plataforma segue boas práticas de segurança alinhadas com requisitos de auditoria financeira.',
    ],
  },
]
</script>

<style scoped>
.faq-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}
.faq-content.open {
  grid-template-rows: 1fr;
}
.faq-content-inner {
  overflow: hidden;
}
</style>
