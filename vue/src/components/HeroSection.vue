<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import heroVideo from '../image/动态主页.mp4'
import heroBgImage from '../image/关于我.jpg'

const visible = ref(false)
const heroRef = ref(null)
const tooltipRef = ref(null)
let ctx = null, canvas = null, animFrame = null

/* ============================================
   Canvas → Image → Video 三模式背景循环
   每段6秒，明快切换
   ============================================ */
const DURATION = 6000 // 8 秒切换

const bgMode = ref('canvas') // 'canvas' | 'image' | 'video'
let imageTimer = null
let isCycling = false // 防止 onVideoEnded 重复触发

// 平滑过渡：暗色背景 alpha 值，通过 lerp 渐变而不跳变
let canvasBgAlpha = 0.35 // 当前暗色 alpha
let targetBgAlpha = 0.35  // 目标 alpha（0 = 透明，0.35 = canvas暗色模式）

const setTargetBgAlpha = (target) => {
  targetBgAlpha = target
  // 如果是从 0→0.35（进canvas模式），立即起步避免太慢
  if (target > 0.3 && canvasBgAlpha < 0.05) {
    canvasBgAlpha = 0.05
  }
}

const startBGModeCycle = () => {
  clearTimeout(imageTimer)
  // Canvas 星空 → 图片背景
  imageTimer = setTimeout(() => {
    setTargetBgAlpha(0) // canvas暗色平滑淡出
    bgMode.value = 'image'

    // 图片 → 视频
    imageTimer = setTimeout(() => {
      bgMode.value = 'video'
      nextTick(() => {
        const video = heroRef.value?.querySelector('.hero-video')
        if (video) {
          video.currentTime = 0
          video.play().catch(() => {})
        }
      })
    }, DURATION)
  }, DURATION)
}

const onVideoEnded = () => {
  // 仅在视频模式下响应 ended 事件
  if (bgMode.value !== 'video' || isCycling) return
  isCycling = true
  bgMode.value = 'canvas'
  setTargetBgAlpha(0.35) // 暗色平滑淡入
  const video = heroRef.value?.querySelector('.hero-video')
  if (video) {
    video.pause()
    video.currentTime = 0
  }
  startBGModeCycle()
  setTimeout(() => { isCycling = false }, 200)
}

/* ============================================
   Solar System State
   ============================================ */
let viewRotX = -0.55
let viewRotY = 0.3
let viewZoom = 1.25
let targetRotX = -0.55
let targetRotY = 0.3
let targetZoom = 1.25

let isDragging = false
let dragPrev = { x: 0, y: 0 }
let dragTotal = 0 // total drag distance — used to distinguish drag vs click
let mouse = { x: 0, y: 0 }
let smoothMouse = { x: 0, y: 0 }
let mouseOnCanvas = false

/* Tooltip / Nav label */
let hoveredPlanet = null

/* ============================================
   Multi-layer star fields
   ============================================ */
let starLayers = []
let nebulaBlobs = []
let shootingStars = [] // image/video模式专用流星拖尾层

/* Planets — all 8 are navigable */
const planetDefs = [
  { id: 'mercury', name: '探索',   en: 'Explore',  orbit: 100, size: 6,    speed: 0.016,  color: '#c8c8d0', type: 'rocky',  ring: false,  desc: '更多精彩内容即将上线', nav: '#coming-soon-1' },
  { id: 'venus',   name: '发现',   en: 'Discover', orbit: 145, size: 9,    speed: 0.012,  color: '#f0d8a8', type: 'rocky',  ring: false,  desc: '未知的领域等待探索', nav: '#coming-soon-2' },
  { id: 'earth',   name: '关于',   en: 'About',    orbit: 195, size: 10,   speed: 0.010,  color: '#5db8ff', type: 'rocky',  ring: false,  desc: '一位热爱前端工程与AI协作的在校开发者', nav: '#about' },
  { id: 'mars',    name: '技能',   en: 'Skills',   orbit: 245, size: 7.5,  speed: 0.008,  color: '#e86040', type: 'rocky',  ring: false,  desc: '持续打磨的技术栈与工具链', nav: '#skills' },
  { id: 'jupiter', name: '作品',   en: 'Projects', orbit: 320, size: 22,   speed: 0.005,  color: '#d4b896', type: 'gas',    ring: false,  desc: '核心项目作品展示', nav: '#projects' },
  { id: 'saturn',  name: '联系',   en: 'Contact',  orbit: 400, size: 18,   speed: 0.004,  color: '#e8d5a3', type: 'gas',    ring: true,   desc: '期待与你建立连接', nav: '#contact' },
  { id: 'uranus',  name: '首页',   en: 'Home',     orbit: 470, size: 13,   speed: 0.003,  color: '#8ad0ee', type: 'ice',    ring: false,  desc: '返回顶部 · 用代码创造优雅体验', nav: '#hero' },
  { id: 'neptune', name: '未来',   en: 'Future',   orbit: 530, size: 12.5, speed: 0.0025, color: '#5588ee', type: 'ice',    ring: false,  desc: '更多创意与可能即将揭晓', nav: '#coming-soon-3' },
]

let planets = []
let coreParticles = []

onMounted(() => {
  visible.value = true
  startBGModeCycle() // 启动 canvas → image → video 循环
})

const go = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

/* ============================================
   Init Solar System
   ============================================ */
onMounted(() => {
  if (canvas) return
  canvas = heroRef.value?.querySelector('.star-canvas')
  if (!canvas) return
  ctx = canvas.getContext('2d')

  const W = () => canvas.width / Math.min(window.devicePixelRatio || 1, 2)
  const H = () => canvas.height / Math.min(window.devicePixelRatio || 1, 2)

  const rand = (min, max) => min + Math.random() * (max - min)
  const randInt = (min, max) => Math.floor(rand(min, max + 1))

  /* ---- Multi-layer star generation ---- */
  const generateStars = (w, h) => {
    starLayers = [
      { // Layer 0: Far deep field
        parallax: 0.03,
        stars: [],
        drift: { x: 0, y: 0 },
      },
      { // Layer 1: Mid field
        parallax: 0.015,
        stars: [],
        drift: { x: 0, y: 0 },
      },
      { // Layer 2: Near field
        parallax: 0.005,
        stars: [],
        drift: { x: 0, y: 0 },
      },
    ]

    // Layer 0 — 800 far tiny stars
    for (let i = 0; i < 800; i++) {
      starLayers[0].stars.push({
        x: rand(0, w * 1.3), y: rand(0, h * 1.3),
        ox: rand(0, w * 1.3), oy: rand(0, h * 1.3),
        r: rand(0.15, 0.55),
        baseAlpha: rand(0.08, 0.35),
        twinkleSpeed: rand(0.3, 0.8),
        twinklePhase: rand(0, Math.PI * 2),
        hue: Math.random() < 0.15 ? randInt(200, 260) : 0,
      })
    }

    // Layer 1 — 500 mid stars
    for (let i = 0; i < 500; i++) {
      starLayers[1].stars.push({
        x: rand(0, w * 1.15), y: rand(0, h * 1.15),
        ox: rand(0, w * 1.15), oy: rand(0, h * 1.15),
        r: rand(0.4, 1.2),
        baseAlpha: rand(0.2, 0.55),
        twinkleSpeed: rand(0.5, 1.4),
        twinklePhase: rand(0, Math.PI * 2),
        hue: Math.random() < 0.22 ? randInt(180, 280) : 0,
      })
    }

    // Layer 2 — 250 near stars (big & bright)
    for (let i = 0; i < 250; i++) {
      starLayers[2].stars.push({
        x: rand(0, w * 1.08), y: rand(0, h * 1.08),
        ox: rand(0, w * 1.08), oy: rand(0, h * 1.08),
        r: rand(0.8, 2.4),
        baseAlpha: rand(0.3, 0.8),
        twinkleSpeed: rand(0.6, 2.0),
        twinklePhase: rand(0, Math.PI * 2),
        hue: Math.random() < 0.3 ? randInt(200, 270) : 0,
        hasCross: Math.random() < 0.12, // 12% have cross spikes
      })
    }

    // Nebula gas blobs
    nebulaBlobs = []
    for (let i = 0; i < 8; i++) {
      nebulaBlobs.push({
        x: rand(w * 0.1, w * 0.9),
        y: rand(h * 0.1, h * 0.9),
        rx: rand(60, 200),
        ry: rand(40, 140),
        angle: rand(0, Math.PI * 2),
        alpha: rand(0.015, 0.05),
        hue: randInt(200, 280),
        driftSpeed: rand(0.1, 0.3),
        driftPhase: rand(0, Math.PI * 2),
      })
    }
  }

  /* ---- Shooting stars for image/video mode ---- */
  const generateShootingStars = (w, h) => {
    shootingStars = []
    // 30-40 条随机流星线，模拟参考图的拖尾星
    for (let i = 0; i < 35; i++) {
      const angle = rand(-Math.PI * 0.8, -Math.PI * 0.2) + Math.random() > 0.5 ? Math.PI : 0 // 左上或右上方向
      const len = rand(15, 60)
      shootingStars.push({
        x: rand(0, w),
        y: rand(0, h),
        vx: Math.cos(angle) * rand(1.2, 4.5),
        vy: Math.sin(angle) * rand(1.2, 4.5),
        len: len,
        width: rand(0.3, 1.2),
        alpha: rand(0.15, 0.6),
        life: 0,
        maxLife: rand(80, 250), // 存活帧数
        delay: randInt(0, 300), // 延迟启动帧
        hue: Math.random() < 0.25 ? randInt(190, 270) : 0,
      })
    }
  }

  /* ---- Generate core glow particles ---- */
  const generateCoreParticles = () => {
    coreParticles = []
    for (let i = 0; i < 200; i++) {
      const angle = rand(0, Math.PI * 2)
      const r = rand(0, 30)
      coreParticles.push({
        x: Math.cos(angle) * r, y: Math.sin(angle) * r,
        r: rand(0.4, 2.0),
        alpha: rand(0.3, 0.9),
        twinkleSpeed: rand(0.8, 3),
        twinklePhase: rand(0, Math.PI * 2),
        orbitSpeed: rand(0.002, 0.012),
        orbitAngle: angle,
        orbitRadius: r,
      })
    }
  }

  /* ---- Init planets ---- */
  const initPlanets = () => {
    planets = planetDefs.map(d => ({
      ...d,
      angle: rand(0, Math.PI * 2),
      x: 0, y: 0, z: 0,
      sx: 0, sy: 0,
      scale: 1,
    }))
  }

  /* ---- Resize ---- */
  const resize = () => {
    const rect = heroRef.value?.getBoundingClientRect()
    if (!rect) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.floor(rect.width)
    const h = Math.floor(rect.height)
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    generateStars(W(), H())
    generateCoreParticles()
    generateShootingStars(W(), H())
  }

  generateStars(W(), H())
  generateCoreParticles()
  generateShootingStars(W(), H())
  initPlanets()
  resize()
  window.addEventListener('resize', resize)

  /* ---- 3D Projection ---- */
  const project = (px, py, pz) => {
    const cosY = Math.cos(viewRotY), sinY = Math.sin(viewRotY)
    const rx = px * cosY - pz * sinY
    const rz = px * sinY + pz * cosY
    const cosX = Math.cos(viewRotX), sinX = Math.sin(viewRotX)
    const ry = py * cosX - rz * sinX
    const rz2 = py * sinX + rz * cosX

    const dist = 600
    const scale = dist / (dist + rz2) * viewZoom
    return { sx: rx * scale, sy: ry * scale, scale }
  }

  /* ---- Mouse events ---- */
  const getPos = (e) => {
    const rect = heroRef.value.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onMove = (e) => {
    const pos = getPos(e)
    mouse = pos
    mouseOnCanvas = true

    if (isDragging) {
      const dx = pos.x - dragPrev.x
      const dy = pos.y - dragPrev.y
      dragTotal += Math.hypot(dx, dy)
      targetRotY += dx * 0.005
      targetRotX -= dy * 0.005
      targetRotX = Math.max(-1.3, Math.min(0.3, targetRotX))
      dragPrev = pos
    }

    checkHover(pos)
  }

  const onLeave = () => {
    isDragging = false
    mouseOnCanvas = false
    canvas.style.cursor = 'grab'
    hideTooltip()
  }

  /* ---- Wheel zoom (Ctrl+Wheel only, otherwise allow page scroll) ---- */
  let wheelVelocity = 0
  const onWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault()
      targetZoom += e.deltaY * -0.001
      targetZoom = Math.max(0.35, Math.min(3.0, targetZoom))
      wheelVelocity = e.deltaY * -0.001 * 3
    }
  }

  /* ---- Click on planet — navigate (via mousedown/mouseup pair) ---- */
  let clickStartPlanet = null

  const onDown = (e) => {
    const pos = getPos(e)
    isDragging = true
    dragTotal = 0
    dragPrev = pos
    clickStartPlanet = findPlanetAt(pos)
    if (canvas) canvas.style.cursor = 'grabbing'
    hideTooltip()
  }

  const onUp = () => {
    // Check if this was a click (not a drag) on a planet
    if (dragTotal < 5 && clickStartPlanet && clickStartPlanet.nav) {
      const nav = clickStartPlanet.nav
      const el = document.querySelector(nav)
      if (el) {
        // 镜头飞向目标行星动画
        flyToPlanet(clickStartPlanet, () => {
          el.scrollIntoView({ behavior: 'smooth' })
        })
      } else {
        console.warn('HeroSection: target not found:', nav)
      }
    }
    isDragging = false
    clickStartPlanet = null
    if (canvas) canvas.style.cursor = mouseOnCanvas ? (hoveredPlanet ? 'pointer' : 'grab') : 'default'
  }

  /* ── 镜头飞向行星 + 星空淡化过渡 ── */
  let isFlying = false
  const flyToPlanet = (planet, onComplete) => {
    if (isFlying) return
    isFlying = true
    const startZoom = targetZoom
    const endZoom = 3.5
    const startTime = performance.now()
    const duration = 800

    const animateFly = (ts) => {
      const elapsed = ts - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-in-out
      const t = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress

      targetZoom = startZoom + (endZoom - startZoom) * t
      // 镜头朝向行星
      const px = planet.x, pz = planet.z
      const dist = Math.hypot(px, pz)
      if (dist > 0) {
        targetRotY = Math.atan2(px, pz) * 0.4
        targetRotX = -0.2
      }

      if (progress < 1) {
        requestAnimationFrame(animateFly)
      } else {
        // 复位 + 触发回调
        setTimeout(() => {
          targetZoom = 1.25
          targetRotY = 0.3
          targetRotX = -0.55
          isFlying = false
          onComplete()
        }, 200)
      }
    }
    requestAnimationFrame(animateFly)
  }

  heroRef.value.addEventListener('mousedown', onDown)
  heroRef.value.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  heroRef.value.addEventListener('mouseleave', onLeave)
  heroRef.value.addEventListener('wheel', onWheel, { passive: false })

  /* ---- Planet hit test ---- */
  const findPlanetAt = (pos) => {
    // p.sx/p.sy are relative to canvas center, pos is relative to hero top-left
    const cx = W() / 2
    const cy = H() / 2 + 20
    for (let i = planets.length - 1; i >= 0; i--) {
      const p = planets[i]
      const dx = pos.x - (cx + p.sx)
      const dy = pos.y - (cy + p.sy)
      const hitR = Math.max(p.size * p.scale * 1.5, 12)
      if (Math.hypot(dx, dy) < hitR) return p
    }
    return null
  }

  const checkHover = (pos) => {
    const p = findPlanetAt(pos)
    if (p !== hoveredPlanet) {
      hoveredPlanet = p
      if (p) {
        canvas.style.cursor = 'pointer'
        showTooltip(p, pos)
      } else {
        canvas.style.cursor = isDragging ? 'grabbing' : 'grab'
        hideTooltip()
      }
    }
  }

  /* ---- Tooltip (nav label) ---- */
  const showTooltip = (planet, pos) => {
    if (!tooltipRef.value) return
    const el = tooltipRef.value
    const accent = planet.color
    el.innerHTML = `
      <div class="tip-name" style="color:${accent}">${planet.name} <span class="tip-en">${planet.en}</span></div>
      <div class="tip-desc">${planet.desc}</div>
      <div class="tip-action">点击探索 →</div>
    `
    el.classList.add('show')
    const x = Math.min(pos.x + 20, (heroRef.value?.getBoundingClientRect().width || 800) - 200)
    const y = Math.max(pos.y - 60, 10)
    el.style.left = x + 'px'
    el.style.top = y + 'px'
  }

  const hideTooltip = () => {
    hoveredPlanet = null
    if (tooltipRef.value) tooltipRef.value.classList.remove('show')
  }

  /* ============================================
     Draw Loop
     ============================================ */
  const draw = (ts) => {
    const t = ts * 0.001
    const w = W(), h = H()
    const cx = w / 2, cy = h / 2 + 20

    // Smooth lerp for rotation & zoom
    viewRotX += (targetRotX - viewRotX) * 0.08
    viewRotY += (targetRotY - viewRotY) * 0.08
    viewZoom += (targetZoom - viewZoom) * 0.08

    // Smooth mouse tracking (for parallax)
    if (mouseOnCanvas) {
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.06
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.06
    } else {
      // Auto gentle drift when mouse is off
      smoothMouse.x += (cx - smoothMouse.x) * 0.008
      smoothMouse.y += (cy - smoothMouse.y) * 0.008
    }

    // Decay wheel velocity
    wheelVelocity *= 0.92

    // Mouse offset for parallax (normalized -1 to 1)
    const mx = (smoothMouse.x / w - 0.5) * 2
    const my = (smoothMouse.y / h - 0.5) * 2

    // ── 背景模式处理 ──
    const isDarkMode = bgMode.value === 'canvas'
    canvasBgAlpha += (targetBgAlpha - canvasBgAlpha) * 0.14
    if (isDarkMode && canvasBgAlpha > 0.002) {
      // canvas模式：暗色消退层清除拖影 + 营造深空星场
      ctx.fillStyle = `rgba(0, 0, 0, ${canvasBgAlpha.toFixed(3)})`
      ctx.fillRect(0, 0, w, h)
    } else if (!isDarkMode) {
      // image/video模式：destination-out 减法消退，星空有拖尾，背景无黑底累积
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.025)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'
    }

    // ── 暗角仅 canvas 模式绘制，image/video 模式不干扰背景穿透 ──
    if (isDarkMode) {
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h))
      bgGrad.addColorStop(0, 'rgba(0, 0, 0, 0)')
      bgGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0)')
      bgGrad.addColorStop(0.85, 'rgba(2, 2, 8, 0.25)')
      bgGrad.addColorStop(1, 'rgba(0, 0, 4, 0.45)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)
    }

    // ── Nebula gas blobs ──
    nebulaBlobs.forEach(nb => {
      nb.x += Math.sin(t * nb.driftSpeed + nb.driftPhase) * 0.15
      nb.y += Math.cos(t * nb.driftSpeed * 0.7 + nb.driftPhase) * 0.15
      const pulse = 1 + Math.sin(t * 0.2 + nb.driftPhase) * 0.3
      const ng = ctx.createRadialGradient(nb.x, nb.y, 0, nb.x, nb.y, nb.rx * pulse)
      ng.addColorStop(0, `hsla(${nb.hue}, 40%, 50%, ${nb.alpha * 1.5})`)
      ng.addColorStop(0.5, `hsla(${nb.hue}, 30%, 40%, ${nb.alpha * 0.6})`)
      ng.addColorStop(1, 'transparent')
      ctx.save()
      ctx.translate(nb.x, nb.y)
      ctx.rotate(nb.angle)
      ctx.scale(pulse, pulse * 0.65)
      ctx.fillStyle = ng
      ctx.beginPath()
      ctx.ellipse(0, 0, nb.rx, nb.ry, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // ── 3-layer star fields with parallax ──
    starLayers.forEach((layer, li) => {
      const driftAmount = layer.parallax

      // Drift the entire layer based on mouse position
      layer.drift.x += (mx * driftAmount * w * 0.5 - layer.drift.x) * 0.03
      layer.drift.y += (my * driftAmount * h * 0.5 - layer.drift.y) * 0.03

      // Wheel zoom effect: stars stretch outward
      const wheelEffect = wheelVelocity * driftAmount * 2

      layer.stars.forEach(s => {
        // Base position + drift offset
        let sx = s.ox + layer.drift.x
        let sy = s.oy + layer.drift.y

        // Wheel zoom radial push
        if (Math.abs(wheelEffect) > 0.0001) {
          const dx = sx - cx
          const dy = sy - cy
          sx += dx * wheelEffect
          sy += dy * wheelEffect
        }

        // Wrap around
        while (sx < -50) sx += w + 100
        while (sx > w + 50) sx -= w + 100
        while (sy < -50) sy += h + 100
        while (sy > h + 50) sy -= h + 100

        const twinkleRaw = Math.sin(t * s.twinkleSpeed + s.twinklePhase)
        // 使用三次方让闪烁更锐利——暗时更暗，亮时更亮
        const twinkle = twinkleRaw > 0
          ? Math.pow(twinkleRaw, 2.5)
          : -Math.pow(Math.abs(twinkleRaw), 2.5)
        // alpha 范围从 baseAlpha*0.12 到 baseAlpha，暗时几乎消失
        const alpha = s.baseAlpha * (0.12 + (twinkle + 1) * 0.44)

        // Near-layer bright stars get glow halo
        if (li === 2 && s.r > 1.5) {
          const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 3)
          halo.addColorStop(0, s.hue ? `hsla(${s.hue}, 60%, 70%, ${alpha * 0.4})` : `rgba(180,200,255,${alpha * 0.35})`)
          halo.addColorStop(1, 'transparent')
          ctx.fillStyle = halo
          ctx.beginPath(); ctx.arc(sx, sy, s.r * 3, 0, Math.PI * 2); ctx.fill()
        }

        ctx.fillStyle = s.hue === 0
          ? `rgba(220, 225, 245, ${alpha})`
          : `hsla(${s.hue}, 50%, 75%, ${alpha})`

        ctx.beginPath()
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2)
        ctx.fill()

        // Cross spikes for special stars
        if (s.hasCross && s.r > 1.2) {
          ctx.strokeStyle = s.hue === 0
            ? `rgba(220, 225, 245, ${alpha * 0.5})`
            : `hsla(${s.hue}, 50%, 75%, ${alpha * 0.5})`
          ctx.lineWidth = 0.3
          ctx.beginPath()
          ctx.moveTo(sx - s.r * 3, sy)
          ctx.lineTo(sx + s.r * 3, sy)
          ctx.moveTo(sx, sy - s.r * 2)
          ctx.lineTo(sx, sy + s.r * 2)
          ctx.stroke()
        }
      })
    })

    // ── Shooting stars (image/video mode only) ──
    if (!isDarkMode) {
      shootingStars.forEach(ss => {
        ss.life++
        if (ss.life < ss.delay) return
        if (ss.life > ss.maxLife + ss.delay) {
          // 重置：随机新位置
          ss.x = rand(0, w)
          ss.y = rand(0, h)
          ss.life = 0
          ss.delay = randInt(60, 300)
          return
        }
        const progress = (ss.life - ss.delay) / ss.maxLife
        // 淡入-恒定-淡出
        let fadeAlpha = ss.alpha
        if (progress < 0.15) fadeAlpha *= progress / 0.15
        else if (progress > 0.7) fadeAlpha *= (1 - progress) / 0.3

        ss.x += ss.vx
        ss.y += ss.vy

        // 边界重置
        if (ss.x < -100 || ss.x > w + 100 || ss.y < -100 || ss.y > h + 100) {
          ss.x = rand(0, w); ss.y = rand(0, h)
          ss.life = 0; ss.delay = randInt(30, 200)
          return
        }

        // 绘制拖尾线：头部亮、尾部渐暗
        const grad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - ss.vx * ss.len * 2, ss.y - ss.vy * ss.len * 2
        )
        if (ss.hue === 0) {
          grad.addColorStop(0, `rgba(230, 240, 255, ${fadeAlpha})`)
          grad.addColorStop(1, `rgba(220, 225, 245, 0)`)
        } else {
          grad.addColorStop(0, `hsla(${ss.hue}, 55%, 80%, ${fadeAlpha})`)
          grad.addColorStop(1, `hsla(${ss.hue}, 40%, 70%, 0)`)
        }
        ctx.strokeStyle = grad
        ctx.lineWidth = ss.width
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(ss.x, ss.y)
        ctx.lineTo(ss.x - ss.vx * ss.len * 2, ss.y - ss.vy * ss.len * 2)
        ctx.stroke()

        // 头部亮点
        ctx.fillStyle = ss.hue === 0
          ? `rgba(255, 255, 255, ${fadeAlpha * 0.9})`
          : `hsla(${ss.hue}, 50%, 85%, ${fadeAlpha * 0.9})`
        ctx.beginPath(); ctx.arc(ss.x, ss.y, ss.width * 1.5, 0, Math.PI * 2); ctx.fill()
      })

      // image/video模式额外：增强星场密度，补画一层稀疏微尘
      for (let i = 0; i < 40; i++) {
        const seed = i * 7919
        const px = ((seed * 13.7) % w + t * (10 + (i % 3) * 8) * (i % 2 ? 1 : -1)) % w
        const py = ((seed * 17.3) % h + t * (6 + (i % 4) * 3) * ((i + 1) % 2 ? 1 : -1)) % h
        const flicker = Math.sin(t * (1.5 + i * 0.12) + seed) * 0.5 + 0.5
        ctx.fillStyle = `rgba(200, 210, 235, ${(0.08 + flicker * 0.18).toFixed(3)})`
        ctx.beginPath(); ctx.arc(px, py, 0.35 + (i % 5) * 0.15, 0, Math.PI * 2); ctx.fill()
      }
    }

    // ── Galaxy spiral dust ──
    ctx.save()
    ctx.translate(cx, cy)
    for (let arm = 0; arm < 4; arm++) {
      const armAngle = (arm / 4) * Math.PI * 2 + t * 0.015 // slow arm rotation
      for (let i = 0; i < 300; i++) {
        const frac = i / 300
        const r = frac * Math.min(w, h) * 0.9
        const seed = (arm * 10000 + i) * 0.12345
        const angle = armAngle + r * 0.0012 + (Math.sin(seed * 73.17) * 0.35) * (1 + frac * 2)
        const px = Math.cos(angle) * r
        const py = Math.sin(angle) * r * 0.55
        const alpha = (1 - frac) * 0.12 * (0.5 + 0.5 * Math.sin(t * 0.3 + i * 0.1))
        ctx.fillStyle = `rgba(140, 170, 230, ${alpha})`
        const particleR = 0.5 + Math.sin(seed * 53.29) * 0.6 + 0.6
        ctx.beginPath(); ctx.arc(px, py, particleR, 0, Math.PI * 2); ctx.fill()
      }
    }
    ctx.restore()

    // ── Orbit rings ──
    ctx.save()
    ctx.translate(cx, cy)
    planets.forEach(p => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.lineWidth = 0.7
      ctx.beginPath()
      const segments = 128
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2
        const ox = Math.cos(a) * p.orbit
        const oz = Math.sin(a) * p.orbit
        const proj = project(ox, 0, oz)
        if (i === 0) ctx.moveTo(proj.sx, proj.sy)
        else ctx.lineTo(proj.sx, proj.sy)
      }
      ctx.stroke()
    })
    ctx.restore()

    // ── Core glow ──
    const coreProj = project(0, 0, 0)
    const coreGrad = ctx.createRadialGradient(cx + coreProj.sx, cy + coreProj.sy, 0, cx + coreProj.sx, cy + coreProj.sy, 80 * viewZoom)
    coreGrad.addColorStop(0, 'rgba(255, 245, 230, 0.8)')
    coreGrad.addColorStop(0.08, 'rgba(255, 220, 180, 0.5)')
    coreGrad.addColorStop(0.25, 'rgba(255, 180, 100, 0.15)')
    coreGrad.addColorStop(0.5, 'rgba(120, 160, 255, 0.04)')
    coreGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = coreGrad
    ctx.fillRect(0, 0, w, h)

    // Core particles orbiting
    coreParticles.forEach(cp => {
      cp.orbitAngle += cp.orbitSpeed
      const px = Math.cos(cp.orbitAngle) * cp.orbitRadius
      const py = Math.sin(cp.orbitAngle) * cp.orbitRadius
      const proj = project(px, py * 0.3, 0)
      const twinkleRaw = Math.sin(t * cp.twinkleSpeed + cp.twinklePhase)
      const twinkle = twinkleRaw > 0
        ? Math.pow(twinkleRaw, 2)
        : -Math.pow(Math.abs(twinkleRaw), 2)
      ctx.fillStyle = `rgba(255, 245, 220, ${cp.alpha * (0.3 + (twinkle + 1) * 0.35)})`
      ctx.beginPath()
      ctx.arc(cx + proj.sx, cy + proj.sy, cp.r * proj.scale, 0, Math.PI * 2)
      ctx.fill()
    })

    // Core bright center
    const centerGrad = ctx.createRadialGradient(cx + coreProj.sx, cy + coreProj.sy, 0, cx + coreProj.sx, cy + coreProj.sy, 22 * viewZoom)
    centerGrad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    centerGrad.addColorStop(0.25, 'rgba(255, 245, 210, 0.9)')
    centerGrad.addColorStop(0.6, 'rgba(255, 210, 140, 0.4)')
    centerGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = centerGrad
    ctx.beginPath()
    ctx.arc(cx + coreProj.sx, cy + coreProj.sy, 22 * viewZoom, 0, Math.PI * 2)
    ctx.fill()

    // ── Mouse cursor glow on canvas ──
    if (mouseOnCanvas && !isDragging) {
      const cursorGlow = ctx.createRadialGradient(smoothMouse.x, smoothMouse.y, 0, smoothMouse.x, smoothMouse.y, 60)
      cursorGlow.addColorStop(0, 'rgba(180, 200, 255, 0.06)')
      cursorGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = cursorGlow
      ctx.fillRect(0, 0, w, h)
    }

    // ── Planets ──
    ctx.save()
    ctx.translate(cx, cy)

    planets.forEach(p => {
      // Pause rotation when hovered
      if (!hoveredPlanet || hoveredPlanet.id !== p.id) {
        p.angle += p.speed
      }
      const px = Math.cos(p.angle) * p.orbit
      const pz = Math.sin(p.angle) * p.orbit
      const proj = project(px, 0, pz)
      p.x = px; p.y = 0; p.z = pz
      p.sx = proj.sx; p.sy = proj.sy; p.scale = proj.scale
      const cosY = Math.cos(viewRotY), sinY = Math.sin(viewRotY)
      const rz = px * sinY + pz * cosY
      const cosX = Math.cos(viewRotX), sinX = Math.sin(viewRotX)
      p._rotZ = rz * cosX
    })

    const sortedPlanets = [...planets].sort((a, b) => a._rotZ - b._rotZ)

    sortedPlanets.forEach(p => {
      const scale = p.scale
      const sx = p.sx, sy = p.sy

      // Saturn's ring
      if (p.ring) {
        ctx.save()
        ctx.translate(sx, sy)
        const ringGrad = ctx.createLinearGradient(-p.size * scale * 1.8, 0, p.size * scale * 1.8, 0)
        ringGrad.addColorStop(0, 'rgba(210, 190, 150, 0)')
        ringGrad.addColorStop(0.2, 'rgba(210, 190, 150, 0.4)')
        ringGrad.addColorStop(0.35, 'rgba(230, 210, 170, 0.7)')
        ringGrad.addColorStop(0.5, 'rgba(240, 220, 180, 0.8)')
        ringGrad.addColorStop(0.65, 'rgba(230, 210, 170, 0.7)')
        ringGrad.addColorStop(0.8, 'rgba(210, 190, 150, 0.4)')
        ringGrad.addColorStop(1, 'rgba(210, 190, 150, 0)')
        ctx.fillStyle = ringGrad
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size * scale * 1.8, p.size * scale * 0.35, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(4, 6, 16, 0.5)'
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size * scale * 1.35, p.size * scale * 0.25, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      const r = p.size * scale

      // Glow aura
      const auraGrad = ctx.createRadialGradient(sx, sy, r * 0.5, sx, sy, r * 2.5)
      auraGrad.addColorStop(0, p.color + '30')
      auraGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = auraGrad
      ctx.beginPath(); ctx.arc(sx, sy, r * 2.5, 0, Math.PI * 2); ctx.fill()

      // Planet surface gradient
      const bodyGrad = ctx.createRadialGradient(sx - r * 0.3, sy - r * 0.3, r * 0.1, sx, sy, r)
      bodyGrad.addColorStop(0, lightenColor(p.color, 40))
      bodyGrad.addColorStop(0.6, p.color)
      bodyGrad.addColorStop(1, darkenColor(p.color, 50))
      ctx.fillStyle = bodyGrad
      ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill()

      // Gas giant bands
      if (p.type === 'gas') {
        for (let band = 0; band < 4; band++) {
          const by = sy - r * 0.5 + band * r * 0.28
          ctx.fillStyle = `rgba(255, 255, 255, 0.06)`
          ctx.beginPath()
          ctx.ellipse(sx, by, r * 0.85, r * 0.1, 0, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Highlight on hover — glow ring + paused orbit
      if (hoveredPlanet && hoveredPlanet.id === p.id) {
        // Outer glow ring
        const hoverGlow = ctx.createRadialGradient(sx, sy, r * 0.8, sx, sy, r * 2.2)
        hoverGlow.addColorStop(0, p.color + '50')
        hoverGlow.addColorStop(0.5, p.color + '18')
        hoverGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = hoverGlow
        ctx.beginPath(); ctx.arc(sx, sy, r * 2.2, 0, Math.PI * 2); ctx.fill()

        // Bright border ring
        ctx.strokeStyle = p.color + 'aa'
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(sx, sy, r + 4, 0, Math.PI * 2); ctx.stroke()

        // Inner bright ring
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(sx, sy, r + 1, 0, Math.PI * 2); ctx.stroke()
      }
    })
    ctx.restore()

    animFrame = requestAnimationFrame(draw)
  }
  animFrame = requestAnimationFrame(draw)

  if (canvas) canvas.style.cursor = 'grab'

  /* ---- Color helpers ---- */
  const lightenColor = (hex, amount) => {
    const num = parseInt(hex.slice(1), 16)
    const r = Math.min(255, (num >> 16) + amount)
    const g = Math.min(255, ((num >> 8) & 0xff) + amount)
    const b = Math.min(255, (num & 0xff) + amount)
    return `rgb(${r},${g},${b})`
  }
  const darkenColor = (hex, amount) => {
    const num = parseInt(hex.slice(1), 16)
    const r = Math.max(0, (num >> 16) - amount)
    const g = Math.max(0, ((num >> 8) & 0xff) - amount)
    const b = Math.max(0, (num & 0xff) - amount)
    return `rgb(${r},${g},${b})`
  }

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    if (animFrame) cancelAnimationFrame(animFrame)
    animFrame = null
    heroRef.value?.removeEventListener('mousedown', onDown)
    heroRef.value?.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    heroRef.value?.removeEventListener('mouseleave', onLeave)
    heroRef.value?.removeEventListener('wheel', onWheel)
    canvas = null
    ctx = null
    if (imageTimer) clearTimeout(imageTimer)
  })
})
</script>

<template>
  <section id="hero" class="hero" ref="heroRef">
    <!-- 视频背景（仅video模式时播放，结束后切回） -->
    <video class="hero-video" :class="{ active: bgMode === 'video' }"
      muted playsinline preload="auto"
      :src="heroVideo" @ended="onVideoEnded"></video>
    <!-- 图片背景（仅image模式可见，显示10s） -->
    <div class="hero-bg-image" :class="{ active: bgMode === 'image' }"
      :style="{ backgroundImage: `url(${heroBgImage})` }"></div>
    <canvas class="star-canvas"></canvas>

    <!-- Planet tooltip -->
    <div class="planet-tooltip" ref="tooltipRef"></div>

    <!-- Zoom indicator -->
    <div class="zoom-hint">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
      <span>鼠标移动探索 · Ctrl+滚轮缩放 · 拖拽旋转 · 点击行星</span>
    </div>

    <div class="hero-content" :class="{ show: visible }">
      <div class="text-block">
        <h1 class="headline">
          用代码创造<span class="highlight">优雅体验</span>
        </h1>
        <p class="subhead">
          前端工程 · 交互设计 · 极致呈现
        </p>
      </div>

      <div class="actions">
        <button class="btn-glass" @click="go('#projects')">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          查看作品
        </button>
        <button class="btn-glass" @click="go('#contact')">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          联系我
        </button>
      </div>
    </div>

    <div class="bottom-fade"></div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* 透明底 + 暗色渐变叠加，让全局星空底图穿透 */
  background: radial-gradient(ellipse 80% 60% at 50% 35%, rgba(0, 1, 8, 0.45) 0%, rgba(0, 1, 8, 0.82) 100%);
}

/* ===== 动态视频背景 ===== */
.hero-video {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.hero-video.active {
  opacity: 0.9;
}

/* ===== 图片背景（视频结束后切换） ===== */
.hero-bg-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.hero-bg-image.active {
  opacity: 1;
}

/* ===== Canvas ===== */
.star-canvas {
  position: absolute;
  inset: 0;
  z-index: 6;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

/* ===== Planet Tooltip ===== */
.planet-tooltip {
  position: absolute;
  z-index: 20;
  background: rgba(10, 12, 24, 0.9);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 14px 18px;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s, transform 0.3s;
  min-width: 150px;
}
.planet-tooltip.show {
  opacity: 1;
  transform: translateY(0);
}
.tip-name {
  font-size: 15px;
  font-weight: 600;
  color: #f4f4f5;
  margin-bottom: 4px;
}
.tip-en {
  font-size: 11px;
  font-weight: 400;
  color: #71717a;
  margin-left: 6px;
}
.tip-desc {
  font-size: 12px;
  color: #a1a1aa;
  line-height: 1.5;
}

/* ===== Zoom Hint ===== */
.zoom-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(160, 170, 200, 0.4);
  font-size: 11px;
  letter-spacing: 0.04em;
  pointer-events: none;
}
.zoom-hint svg {
  opacity: 0.5;
}

/* ===== Content ===== */
.hero-content {
  position: relative;
  text-align: center;
  padding: 0 24px;
  max-width: 720px;
  z-index: 7;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 1.2s cubic-bezier(0.16,1,0.3,1),
              transform 1.2s cubic-bezier(0.16,1,0.3,1);
  pointer-events: none;
}
.hero-content.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.hero-content .btn-glass {
  pointer-events: auto;
}

.text-block { position: relative; }

.headline {
  font-size: clamp(40px, 7vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: rgba(244, 244, 245, 0.92);
  margin-bottom: 20px;
  text-shadow: 0 0 80px rgba(130, 160, 240, 0.15),
               0 0 20px rgba(130, 160, 240, 0.06);
}

.highlight {
  background: linear-gradient(135deg, #93c5fd 0%, #a5b4fc 30%, #c4b5fd 60%, #a5b4fc 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: highlight-shift 4s ease-in-out infinite;
}
@keyframes highlight-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.subhead {
  font-size: 14px;
  font-weight: 400;
  color: rgba(180, 190, 220, 0.5);
  letter-spacing: 0.15em;
  margin-bottom: 44px;
  text-shadow: 0 0 30px rgba(130, 160, 240, 0.08);
}

/* ===== Actions ===== */
.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-glass {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(220, 225, 240, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 13px 28px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.03em;
}

.btn-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: linear-gradient(135deg, rgba(148, 163, 240, 0.15), rgba(192, 132, 252, 0.1));
  opacity: 0;
  transition: opacity 0.4s;
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(148, 163, 240, 0.35);
  color: #fff;
  transform: translateY(-2px) scale(1.03);
  box-shadow:
    0 0 40px rgba(148, 163, 240, 0.12),
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.btn-glass:hover::before { opacity: 1; }
.btn-glass:active { transform: translateY(0) scale(0.98); }

.btn-icon {
  width: 16px; height: 16px;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.btn-glass:hover .btn-icon { opacity: 1; }

/* ===== Bottom fade — 平滑过渡到内页，星空底图始终穿透 ===== */
.bottom-fade {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 250px;
  background: linear-gradient(to top, rgba(3, 4, 16, 0.75) 0%, rgba(3, 4, 16, 0.35) 50%, transparent 100%);
  z-index: 7;
  pointer-events: none;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .headline { font-size: clamp(30px, 9vw, 46px); }
  .subhead { font-size: 12px; margin-bottom: 32px; }
  .btn-glass { padding: 11px 24px; font-size: 13px; }
  .actions { gap: 12px; }
  .zoom-hint { font-size: 10px; }
}

@media (prefers-reduced-motion: reduce) {
  .highlight { animation: none; }
}
</style>
