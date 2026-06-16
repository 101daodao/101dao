<script setup>
import SpaceGlass from './SpaceGlass.vue'
import PlanetMini from './PlanetMini.vue'
import skillsBg from '../image/通用.png'

const categories = [
  {
    title: '基础',
    icon: 'Cpu',
    items: ['HTML5 / CSS3', 'Grid / Flex', 'JavaScript (ES6+)', 'TypeScript']
  },
  {
    title: '框架 / 库',
    icon: 'Grid',
    items: ['Vue 3', 'Vite', 'Pinia', 'Vue Router', 'Element Plus', 'Axios']
  },
  {
    title: '工具',
    icon: 'SetUp',
    items: ['Git', 'npm / yarn', 'ESLint', 'Postman', 'VS Code']
  }
]

const goHome = () => {
  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="skills" class="skills-page page-section">
    <!-- 页面背景 -->
    <div class="section-bg" :style="{ backgroundImage: `url(${skillsBg})` }"></div>
    <div class="page-corner-stars"></div>

    <!-- 浮动粒子 -->
    <div class="skills-bg">
      <span class="bg-particle" v-for="n in 8" :key="n" :style="{
        left: (n * 14 + (n % 3) * 4) + '%',
        animationDelay: (n * 0.6) + 's',
        animationDuration: (7 + n * 1.5) + 's',
        width: (3 + n % 3 * 3) + 'px',
        height: (3 + n % 3 * 3) + 'px'
      }"></span>
    </div>

    <h2 class="section-title fade-up">
      <span class="orbit-icon"></span>
      Skills
    </h2>
    <p class="section-subtitle fade-up delay-1">持续打磨的技术栈</p>

    <div class="skills-grid">
      <div
        v-for="(cat, i) in categories"
        :key="cat.title"
        class="skill-card-wrapper orbit-in"
        :class="'delay-' + (i + 2)"
        :style="{ '--orbit-angle': 40 + i * 50, '--orbit-dist': 60 + i * 15 }"
      >
        <SpaceGlass glow corner-stars :padded="false">
          <div class="skill-card-inner">
            <div class="card-header">
              <div class="icon-box">
                <el-icon :size="18"><component :is="cat.icon" /></el-icon>
              </div>
              <span class="card-count">{{ String(cat.items.length).padStart(2, '0') }}</span>
            </div>
            <h3 class="card-title">{{ cat.title }}</h3>
            <div class="tag-list">
              <span v-for="item in cat.items" :key="item" class="tech-tag orbit-hover">
                {{ item }}
              </span>
            </div>
          </div>
        </SpaceGlass>
      </div>
    </div>

    <!-- 右下角悬浮行星 (齿轮科技行星) -->
    <PlanetMini color="#e86040" :size="38" type="rocky" @click="goHome" />
  </section>
</template>

<style scoped>
.skills-page {
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.skill-card-inner {
  padding: 32px 28px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(66, 140, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  transition: transform 0.25s var(--ease-spring), background 0.25s;
}

.card-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  background: rgba(66, 140, 255, 0.06);
  color: var(--accent);
  border: 1px solid rgba(66, 140, 255, 0.12);
  cursor: default;
  transition: all 0.3s;
}

.tech-tag:hover {
  background: rgba(66, 140, 255, 0.12);
  border-color: rgba(151, 72, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(66, 140, 255, 0.12);
}

/* 浮动粒子 */
.skills-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.bg-particle {
  position: absolute;
  top: -20px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
  animation: particle-drift linear infinite;
}

@keyframes particle-drift {
  0% { opacity: 0; transform: translateY(0) scale(0.6); }
  10% { opacity: 0.15; }
  90% { opacity: 0.08; }
  100% { opacity: 0; transform: translateY(600px) scale(1.2); }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  .skill-card-inner {
    padding: 24px 22px;
  }
}
</style>
