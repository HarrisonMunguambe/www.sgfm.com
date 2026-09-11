import type { Directive } from 'vue'
import { onMounted, onUnmounted, reactive, ref, type Ref } from 'vue'

const isReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isTouchOrSmall = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

type MagneticEl = HTMLElement & { __magCleanup?: () => void }

export const vMagnetic: Directive<MagneticEl, number | undefined> = {
  mounted(el, binding) {
    if (isReducedMotion() || isTouchOrSmall()) return
    const strength = binding.value ?? 0.3
    el.classList.add('sgfm-magnetic')

    let raf = 0
    let tx = 0
    let ty = 0

    const apply = () => {
      raf = 0
      el.style.setProperty('--mag-x', `${tx}px`)
      el.style.setProperty('--mag-y', `${ty}px`)
    }
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      tx = (e.clientX - (rect.left + rect.width / 2)) * strength
      ty = (e.clientY - (rect.top + rect.height / 2)) * strength
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      if (!raf) raf = requestAnimationFrame(apply)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    el.__magCleanup = () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  },
  beforeUnmount(el) {
    el.__magCleanup?.()
  },
}

type SpotEl = HTMLElement & { __spotCleanup?: () => void }

export const vSpotlight: Directive<SpotEl> = {
  mounted(el) {
    if (isTouchOrSmall()) return
    el.classList.add('sgfm-spotlight')

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
    }
    el.addEventListener('mousemove', onMove)
    el.__spotCleanup = () => el.removeEventListener('mousemove', onMove)
  },
  beforeUnmount(el) {
    el.__spotCleanup?.()
  },
}

type RevealEl = HTMLElement & { __revealObs?: IntersectionObserver }

interface RevealOpts {
  delay?: number
  threshold?: number
}

export const vReveal: Directive<RevealEl, RevealOpts | number | undefined> = {
  mounted(el, binding) {
    if (isReducedMotion()) {
      el.classList.add('is-revealed')
      return
    }
    const opts: RevealOpts =
      typeof binding.value === 'number' ? { delay: binding.value } : (binding.value ?? {})

    el.classList.add('sgfm-reveal')
    if (opts.delay) el.style.transitionDelay = `${opts.delay}ms`

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            obs.disconnect()
            break
          }
        }
      },
      { threshold: opts.threshold ?? 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    obs.observe(el)
    el.__revealObs = obs
  },
  beforeUnmount(el) {
    el.__revealObs?.disconnect()
  },
}

/**
 * Posição do cursor normalizada (-1..1) em relação ao centro do elemento.
 * Alimenta as variáveis --mx/--my usadas pelas camadas `.sgfm-parallax`.
 * Fica parada (0, 0) com prefers-reduced-motion ou em ecrãs sem rato.
 */
export function usePointerParallax(target: Ref<HTMLElement | null>) {
  const pointer = reactive({ x: 0, y: 0 })
  let raf = 0
  let lastX = 0
  let lastY = 0
  const clamp = (v: number) => Math.max(-1, Math.min(1, v))
  const round = (v: number) => Math.round(v * 1000) / 1000

  const apply = () => {
    raf = 0
    const el = target.value
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.bottom < 0 || r.top > window.innerHeight) return
    pointer.x = round(clamp((lastX - (r.left + r.width / 2)) / (r.width / 2)))
    pointer.y = round(clamp((lastY - (r.top + r.height / 2)) / (r.height / 2)))
  }
  const onMove = (e: PointerEvent) => {
    lastX = e.clientX
    lastY = e.clientY
    if (!raf) raf = requestAnimationFrame(apply)
  }

  onMounted(() => {
    if (isReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches)
      return
    window.addEventListener('pointermove', onMove, { passive: true })
  })
  onUnmounted(() => {
    window.removeEventListener('pointermove', onMove)
    if (raf) cancelAnimationFrame(raf)
  })

  return pointer
}

interface CountUpOptions {
  duration?: number
  threshold?: number
}

export function useCountUp(target: Ref<number> | number, options: CountUpOptions = {}) {
  const value = ref(0)
  const el = ref<HTMLElement | null>(null)
  const duration = options.duration ?? 1400
  const threshold = options.threshold ?? 0.3

  let started = false
  let raf = 0
  let obs: IntersectionObserver | null = null

  const finalTarget = () => (typeof target === 'number' ? target : target.value)

  const animate = () => {
    if (isReducedMotion()) {
      value.value = finalTarget()
      return
    }
    const startVal = 0
    const endVal = finalTarget()
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      value.value = startVal + (endVal - startVal) * eased
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (!el.value) return
    obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true
            animate()
            obs?.disconnect()
            break
          }
        }
      },
      { threshold },
    )
    obs.observe(el.value)
  })

  onUnmounted(() => {
    obs?.disconnect()
    if (raf) cancelAnimationFrame(raf)
  })

  return { el, value }
}
