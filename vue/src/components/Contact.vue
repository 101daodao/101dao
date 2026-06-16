<script setup>
import SpaceGlass from './SpaceGlass.vue'
import PlanetMini from './PlanetMini.vue'
import contactBg from '../image/联系.jpg'

const contacts = [
  { icon: 'Message', label: '邮箱', value: 'zdw060127@163.com', color: '#428cff' },
  { icon: 'Link', label: 'GitHub', value: 'github.com/101daodao/101daoAI', color: '#a1a1aa' },
  { icon: 'ChatDotRound', label: '微信', value: 'daow101', color: '#22c55e' },
  { icon: 'Phone', label: '电话', value: '暂无', color: '#ef4444' }
]

const goHome = () => {
  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="contact" class="contact-page page-section">
    <!-- 页面背景 -->
    <div class="section-bg" :style="{ backgroundImage: `url(${contactBg})` }"></div>
    <div class="page-corner-stars"></div>

    <h2 class="section-title fade-up">
      <span class="orbit-icon"></span>
      Contact
    </h2>
    <p class="section-subtitle fade-up delay-1">期待与你建立连接</p>

    <div class="contact-grid">
      <div
        v-for="(c, i) in contacts"
        :key="c.label"
        class="contact-card-wrapper orbit-in"
        :class="'delay-' + (i + 2)"
        :style="{ '--orbit-angle': 20 + i * 40, '--orbit-dist': 40 + i * 10 }"
      >
        <SpaceGlass glow corner-stars :padded="false">
          <div class="contact-card-inner">
            <div class="contact-icon-box" :style="{ color: c.color, background: `${c.color}14` }">
              <el-icon :size="22"><component :is="c.icon" /></el-icon>
            </div>
            <div class="contact-info">
              <span class="contact-label">{{ c.label }}</span>
              <span class="contact-value">{{ c.value }}</span>
            </div>
          </div>
        </SpaceGlass>
      </div>
    </div>

    <!-- 右下角悬浮行星 (信号通讯行星) -->
    <PlanetMini color="#e8d5a3" :size="40" type="gas" ring @click="goHome" />
  </section>
</template>

<style scoped>
.contact-page {
  justify-content: flex-start;
  padding-top: 140px;
  min-height: 100vh;
  background: transparent;
}

.section-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.contact-card-inner {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px 28px;
}

.contact-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.25s var(--ease-spring);
}

.contact-card-wrapper:hover .contact-icon-box {
  transform: scale(1.12);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.contact-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
}

.contact-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  word-break: break-all;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .contact-card-inner {
    padding: 20px 22px;
  }
}
</style>
