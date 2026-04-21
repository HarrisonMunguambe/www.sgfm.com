<template>
  <canvas
    ref="canvas"
    class="fixed inset-0 w-full h-full pointer-events-none -z-[1]"
    aria-hidden="true"
  ></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0
let particles: { x: number; y: number; vx: number; vy: number; r: number; h: number }[] = []

function resize(c: HTMLCanvasElement) {
  c.width = window.innerWidth * window.devicePixelRatio
  c.height = window.innerHeight * window.devicePixelRatio
  c.style.width = window.innerWidth + 'px'
  c.style.height = window.innerHeight + 'px'
}

function init(c: HTMLCanvasElement) {
  const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 28000))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.25 * window.devicePixelRatio,
    vy: (Math.random() - 0.5) * 0.25 * window.devicePixelRatio,
    r: (Math.random() * 1.5 + 0.5) * window.devicePixelRatio,
    h: Math.random() > 0.5 ? 195 : 265,
  }))
}

function tick() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, c.width, c.height)

  const isDark = document.documentElement.classList.contains('dark')
  const fillAlpha = isDark ? 0.45 : 0.55
  const lineColor = isDark ? '0, 242, 254' : '14, 165, 233'
  const lineAlpha = isDark ? 0.12 : 0.18

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > c.width) p.vx *= -1
    if (p.y < 0 || p.y > c.height) p.vy *= -1
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${p.h}, 85%, 55%, ${fillAlpha})`
    ctx.fill()
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const d = Math.sqrt(dx * dx + dy * dy)
      const max = 140 * window.devicePixelRatio
      if (d < max) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(${lineColor}, ${lineAlpha * (1 - d / max)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  raf = requestAnimationFrame(tick)
}

function onResize() {
  const c = canvas.value
  if (!c) return
  resize(c)
  init(c)
}

onMounted(() => {
  const c = canvas.value
  if (!c) return
  resize(c)
  init(c)
  tick()
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', onResize)
})
</script>
