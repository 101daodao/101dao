<script setup>
/**
 * ComingSoon — 探索 / 发现 / 未来 页面
 * 全屏星空底层 + 玻璃容器 + 未解锁行星 + 反向视差
 */
import { ref, onMounted, onUnmounted } from 'vue'
import SpaceGlass from './SpaceGlass.vue'
import PlanetMini from './PlanetMini.vue'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, default: '即将上线' },
  en: { type: String, default: 'Coming Soon' },
  color: { type: String, default: '#5db8ff' },
  icon: { type: String, default: '🚀' },
})

const goHome = () => {
  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
}

/* 未解锁行星数据 (对应技能/作品/联系) */
const lockedPlanets = [
  { name: '技能', en: 'Skills', color: '#e86040', desc: '待解锁板块' },
  { name: '作品', en: 'Projects', color: '#d4b896', desc: '待解锁板块' },
  { name: '联系', en: 'Contact', color: '#e8d5a3', desc: '待解锁板块' },
]

const parallaxStyle = ref({})
let ticking = false

const updateParallax = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const scrolled = window.scrollY
    const el = document.getElementById(props.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      const offset = (rect.top - window.innerHeight * 0.5) * 0.08
      parallaxStyle.value = { transform: `translateY(${offset}px)` }
    }
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateParallax, { passive: true })
  updateParallax()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateParallax)
})
</script>

<template>
  <section :id="id" class="cs-page page-section">
    <!-- 页面四角星点 -->
    <div class="page-corner-stars"></div>

    <!-- 页面下半区漂浮星点粒子 (消除大面积纯黑留白) -->
    <div class="cs-floating-stars">
      <span v-for="n in 30" :key="n" class="cs-float-star" :style="{
        left: ((n * 37 + 13) % 100) + '%',
        top: (40 + (n * 29 + 7) % 55) + '%',
        animationDelay: (n * 0.3) + 's',
        animationDuration: (6 + (n % 5) * 2) + 's',
        width: (2 + (n % 4)) + 'px',
        height: (2 + (n % 4)) + 'px',
        opacity: 0.15 + (n % 5) * 0.05,
      }"></span>
    </div>

    <!-- 居中玻璃容器 -->
    <SpaceGlass glow corner-stars class="cs-glass fade-scale">
      <div class="cs-inner">
        <!-- 望远镜图标 + 呼吸发光 + 环形轨道光晕 -->
        <div class="cs-icon-wrap">
          <div class="cs-icon-orbit"></div>
          <span class="cs-icon breath-glow">{{ icon }}</span>
        </div>

        <h2 class="cs-title">
          {{ title }}
          <span class="cs-en">{{ en }}</span>
        </h2>

        <!-- 渐变轨道分割线 -->
        <div class="gradient-divider"></div>

        <p class="cs-desc">此页面正在建设中，更多精彩内容即将揭晓。</p>

        <!-- 未解锁行星剪影 -->
        <div class="cs-locked-planets">
          <div
            v-for="(lp, i) in lockedPlanets"
            :key="lp.name"
            class="cs-locked-planet"
            :style="{
              '--lp-color': lp.color,
              animationDelay: (0.2 * i) + 's',
            }"
          >
            <div class="lp-orbit-dashed"></div>
            <div class="lp-planet-body" :style="{ background: lp.color + '33' }">
              <div class="lp-planet-core" :style="{ background: lp.color }"></div>
            </div>
            <span class="lp-name">{{ lp.name }}</span>
            <span class="lp-hint">{{ lp.desc }}</span>
          </div>
        </div>
      </div>
    </SpaceGlass>

    <!-- 右下角悬浮行星 (灰白未解锁) -->
    <PlanetMini :color="color" :size="36" type="ice" @click="goHome" />
  </section>
</template>

<style scoped>
.cs-page {
  justify-content: center;
  min-height: 100vh;
  position: relative;
  background: transparent;
}

/* 漂浮星点粒子 */
.cs-floating-stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.cs-float-star {
  position: absolute;
  border-radius: 50%;
  background: rgba(200, 220, 255, 0.6);
  animation: cs-star-float 8s ease-in-out infinite;
}

@keyframes cs-star-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
  25% { transform: translateY(-12px) scale(1.4); opacity: 0.6; }
  50% { transform: translateY(-20px) scale(0.9); opacity: 0.35; }
  75% { transform: translateY(-6px) scale(1.2); opacity: 0.5; }
}

/* 居中玻璃容器 */
.cs-glass {
  max-width: 560px;
  width: 100%;
  position: relative;
  z-index: 2;
}

.cs-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 望远镜图标 + 轨道光晕 */
.cs-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.cs-icon {
  font-size: 56px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 20px rgba(66, 140, 255, 0.4));
}

.cs-icon-orbit {
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 1px solid rgba(66, 140, 255, 0.12);
  animation: cs-icon-orbit-spin 8s linear infinite;
}

.cs-icon-orbit::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--space-blue);
  transform: translateX(-50%);
  box-shadow: 0 0 10px rgba(66, 140, 255, 0.6);
}

@keyframes cs-icon-orbit-spin {
  to { transform: rotate(360deg); }
}

.cs-title {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 700;
  color: rgba(244, 244, 245, 0.92);
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.cs-en {
  display: block;
  font-size: 13px;
  font-weight: 400;
  color: rgba(160, 170, 200, 0.4);
  letter-spacing: 0.12em;
  margin-top: 6px;
}

.cs-desc {
  font-size: 14px;
  color: rgba(160, 170, 200, 0.5);
  letter-spacing: 0.04em;
  margin-bottom: 36px;
}

/* 未解锁行星剪影 */
.cs-locked-planets {
  display: flex;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;
}

.cs-locked-planet {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: default;
  transition: transform 0.35s var(--ease-spring);
  animation: line-fade-in 0.6s var(--ease-expo) forwards;
  opacity: 0;
}

.cs-locked-planet:hover {
  transform: translateY(-6px) scale(1.08);
}

.cs-locked-planet:hover .lp-planet-body {
  box-shadow: 0 0 20px var(--lp-color, rgba(66,140,255,0.4));
  border-color: var(--lp-color, rgba(66,140,255,0.6));
}

/* 虚线轨道 */
.lp-orbit-dashed {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  transform: translate(-50%, -50%);
  animation: cs-icon-orbit-spin 12s linear infinite;
}

.lp-planet-body {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.35s, border-color 0.35s;
  z-index: 1;
}

.lp-planet-core {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.5;
}

.lp-name {
  font-size: 12px;
  font-weight: 600;
  color: rgba(200, 210, 230, 0.5);
  letter-spacing: 0.04em;
}

.lp-hint {
  font-size: 10px;
  color: rgba(160, 170, 200, 0.3);
  opacity: 0;
  transition: opacity 0.3s;
}

.cs-locked-planet:hover .lp-name {
  color: rgba(240, 242, 255, 0.8);
}
.cs-locked-planet:hover .lp-hint {
  opacity: 1;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .cs-locked-planets {
    gap: 20px;
  }
  .cs-icon {
    font-size: 42px;
  }
  .cs-icon-orbit {
    width: 70px;
    height: 70px;
  }
}
</style>
