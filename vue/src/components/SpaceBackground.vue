<script setup>
/**
 * SpaceBackground — 全站统一星空底层组件
 * 所有页面共用同一个 canvas 星空场景
 * 通过 opacity 控制首页(100%)与内页(8%~15%)的显隐层级
 */
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  /** 星空透明度: 首页 1, 内页 0.08~0.15 */
  opacity: { type: Number, default: 1 },
  /** 是否降低粒子密度 (内页性能优化) */
  reduced: { type: Boolean, default: false },
  /** 反向视差强度 (内页滚动用) */
  parallaxReverse: { type: Boolean, default: false },
})

const canvasRef = ref(null)
let ctx = null, animFrame = null, canvas = null
let starLayers = []
let nebulaBlobs = []
let galaxyDust = []
let scrollY = 0
let targetScrollY = 0

const W = () => canvas?.width / Math.min(window.devicePixelRatio || 1, 2) || 800
const H = () => canvas?.height / Math.min(window.devicePixelRatio || 1, 2) || 600

const rand = (min, max) => min + Math.random() * (max - min)
const randInt = (min, max) => Math.floor(rand(min, max + 1))

const generate = () => {
  const w = W(), h = H()
  const density = props.reduced ? 0.4 : 1

  starLayers = [
    { parallax: 0.04, stars: [], drift: { x: 0, y: 0 } },
    { parallax: 0.02, stars: [], drift: { x: 0, y: 0 } },
    { parallax: 0.008, stars: [], drift: { x: 0, y: 0 } },
  ]

  for (let i = 0; i < Math.floor(600 * density); i++) {
    starLayers[0].stars.push({
      ox: rand(0, w * 1.3), oy: rand(0, h * 1.3),
      r: rand(0.15, 0.5),
      baseAlpha: rand(0.06, 0.3),
      twinkleSpeed: rand(0.3, 0.8),
      twinklePhase: rand(0, Math.PI * 2),
      hue: Math.random() < 0.12 ? randInt(200, 260) : 0,
    })
  }
  for (let i = 0; i < Math.floor(350 * density); i++) {
    starLayers[1].stars.push({
      ox: rand(0, w * 1.15), oy: rand(0, h * 1.15),
      r: rand(0.4, 1.1),
      baseAlpha: rand(0.15, 0.45),
      twinkleSpeed: rand(0.5, 1.2),
      twinklePhase: rand(0, Math.PI * 2),
      hue: Math.random() < 0.18 ? randInt(180, 280) : 0,
    })
  }
  for (let i = 0; i < Math.floor(180 * density); i++) {
    starLayers[2].stars.push({
      ox: rand(0, w * 1.08), oy: rand(0, h * 1.08),
      r: rand(0.7, 2.2),
      baseAlpha: rand(0.25, 0.7),
      twinkleSpeed: rand(0.6, 1.8),
      twinklePhase: rand(0, Math.PI * 2),
      hue: Math.random() < 0.25 ? randInt(200, 270) : 0,
      hasCross: Math.random() < 0.08,
    })
  }

  // 星云
  nebulaBlobs = []
  for (let i = 0; i < Math.floor(6 * density); i++) {
    nebulaBlobs.push({
      x: rand(w * 0.1, w * 0.9), y: rand(h * 0.1, h * 0.9),
      rx: rand(50, 160), ry: rand(30, 110),
      angle: rand(0, Math.PI * 2),
      alpha: rand(0.01, 0.04),
      hue: randInt(200, 280),
      driftSpeed: rand(0.08, 0.25),
      driftPhase: rand(0, Math.PI * 2),
    })
  }

  // 银河尘埃
  galaxyDust = []
  for (let arm = 0; arm < 3; arm++) {
    const armAngle = (arm / 3) * Math.PI * 2
    for (let i = 0; i < Math.floor(200 * density); i++) {
      const frac = i / 200
      const r = frac * Math.min(w, h) * 0.8
      const seed = (arm * 10000 + i) * 0.12345
      const angle = armAngle + r * 0.001 + Math.sin(seed * 73.17) * 0.3 * (1 + frac * 2)
      galaxyDust.push({
        ox: Math.cos(angle) * r, oy: Math.sin(angle) * r * 0.5,
        baseAlpha: (1 - frac) * 0.1,
        r: 0.4 + Math.sin(seed * 53.29) * 0.5 + 0.5,
      })
    }
  }
}

const resize = () => {
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = canvas.parentElement?.getBoundingClientRect()
  if (!rect) return
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  canvas.style.width = rect.width + 'px'
  canvas.style.height = rect.height + 'px'
  generate()
}

const draw = (ts) => {
  if (!ctx || !canvas) return
  const t = ts * 0.001
  const w = W(), h = H()
  const cx = w / 2, cy = h / 2

  // 平滑滚动
  scrollY += (targetScrollY - scrollY) * 0.05

  ctx.clearRect(0, 0, w, h)

  // 星云
  nebulaBlobs.forEach(nb => {
    nb.x += Math.sin(t * nb.driftSpeed + nb.driftPhase) * 0.1
    nb.y += Math.cos(t * nb.driftSpeed * 0.7 + nb.driftPhase) * 0.1
    const pulse = 1 + Math.sin(t * 0.15 + nb.driftPhase) * 0.25
    const ng = ctx.createRadialGradient(nb.x, nb.y, 0, nb.x, nb.y, nb.rx * pulse)
    ng.addColorStop(0, `hsla(${nb.hue}, 40%, 50%, ${nb.alpha * 1.3})`)
    ng.addColorStop(0.5, `hsla(${nb.hue}, 30%, 40%, ${nb.alpha * 0.5})`)
    ng.addColorStop(1, 'transparent')
    ctx.save()
    ctx.translate(nb.x, nb.y)
    ctx.rotate(nb.angle)
    ctx.scale(pulse, pulse * 0.6)
    ctx.fillStyle = ng
    ctx.beginPath(); ctx.ellipse(0, 0, nb.rx, nb.ry, 0, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  })

  // 银河尘埃
  ctx.save()
  ctx.translate(cx, cy)
  galaxyDust.forEach(gd => {
    const alpha = gd.baseAlpha * (0.5 + 0.5 * Math.sin(t * 0.25 + gd.ox * 0.01))
    ctx.fillStyle = `rgba(140, 170, 230, ${alpha})`
    ctx.beginPath(); ctx.arc(gd.ox, gd.oy, gd.r, 0, Math.PI * 2); ctx.fill()
  })
  ctx.restore()

  // 星空图层
  starLayers.forEach((layer) => {
    const driftFactor = props.parallaxReverse ? -1 : 1
    const parallaxOffset = scrollY * layer.parallax * driftFactor * 0.3
    layer.drift.x += (-layer.drift.x) * 0.02
    layer.drift.y += (parallaxOffset - layer.drift.y) * 0.02

    layer.stars.forEach(s => {
      let sx = s.ox + layer.drift.x
      let sy = s.oy + layer.drift.y
      while (sx < -50) sx += w + 100
      while (sx > w + 50) sx -= w + 100
      while (sy < -50) sy += h + 100
      while (sy > h + 50) sy -= h + 100

      const twinkleRaw = Math.sin(t * s.twinkleSpeed + s.twinklePhase)
      const twinkle = twinkleRaw > 0 ? Math.pow(twinkleRaw, 2.5) : -Math.pow(Math.abs(twinkleRaw), 2.5)
      const alpha = s.baseAlpha * (0.15 + (twinkle + 1) * 0.425)

      if (s.hasCross && s.r > 1) {
        const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 2.5)
        halo.addColorStop(0, s.hue ? `hsla(${s.hue}, 60%, 70%, ${alpha * 0.3})` : `rgba(180,200,255,${alpha * 0.3})`)
        halo.addColorStop(1, 'transparent')
        ctx.fillStyle = halo
        ctx.beginPath(); ctx.arc(sx, sy, s.r * 2.5, 0, Math.PI * 2); ctx.fill()

        ctx.strokeStyle = s.hue ? `hsla(${s.hue}, 50%, 75%, ${alpha * 0.4})` : `rgba(220,225,245,${alpha * 0.4})`
        ctx.lineWidth = 0.25
        ctx.beginPath()
        ctx.moveTo(sx - s.r * 2.5, sy); ctx.lineTo(sx + s.r * 2.5, sy)
        ctx.moveTo(sx, sy - s.r * 1.8); ctx.lineTo(sx, sy + s.r * 1.8)
        ctx.stroke()
      }

      ctx.fillStyle = s.hue === 0 ? `rgba(220,225,245,${alpha})` : `hsla(${s.hue}, 50%, 75%, ${alpha})`
      ctx.beginPath(); ctx.arc(sx, sy, s.r, 0, Math.PI * 2); ctx.fill()
    })
  })

  animFrame = requestAnimationFrame(draw)
}

onMounted(() => {
  canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  animFrame = requestAnimationFrame(draw)
  window.addEventListener('resize', resize)
  window.addEventListener('scroll', () => { targetScrollY = window.scrollY }, { passive: true })
})

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
  window.removeEventListener('resize', resize)
  window.removeEventListener('scroll', () => { targetScrollY = window.scrollY })
  canvas = null; ctx = null
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="space-bg-canvas"
    :style="{ opacity: props.opacity }"
  />
</template>

<style scoped>
.space-bg-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
