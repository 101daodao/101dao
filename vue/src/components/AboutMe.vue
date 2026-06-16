<script setup>
import SpaceGlass from './SpaceGlass.vue'
import PlanetMini from './PlanetMini.vue'
import aboutBg from '../image/通用.png'

const info = [
  { icon: 'School', label: '学校', value: '辽宁建筑职业学院' },
  { icon: 'Collection', label: '专业', value: '软件技术（24级）' },
  { icon: 'Message', label: '邮箱', value: '3550420565@qq.com' },
  { icon: 'ChatDotRound', label: '微信', value: 'daow101' },
]

const goHome = () => {
  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="about" class="about-page page-section">
    <!-- 页面背景 -->
    <div class="section-bg" :style="{ backgroundImage: `url(${aboutBg})` }"></div>
    <!-- 页面四角星点 -->
    <div class="page-corner-stars"></div>

    <div class="dust-line"></div>
    <h2 class="section-title fade-up">
      <span class="orbit-icon"></span>
      About
    </h2>
    <p class="section-subtitle fade-up delay-1">一位热爱前端工程与 AI 协作的在校开发者</p>

    <div class="about-grid">
      <!-- 左栏头像区 — 玻璃容器包裹 -->
      <div class="avatar-col orbit-arc delay-2" style="--arc-deg: 35">
        <SpaceGlass :padded="false" corner-stars>
          <div class="avatar-inner">
            <div class="avatar-frame">
              <!-- 多层同心渐变环形轨道 -->
              <div class="avatar-orbit-ring avatar-orbit-1"></div>
              <div class="avatar-orbit-ring avatar-orbit-2"></div>
              <div class="avatar-orbit-ring avatar-orbit-3"></div>
              <!-- 头像主体 -->
              <div class="avatar-glow-bg"></div>
              <div class="avatar-border-ring">
                <img src="../image/tx.jpg" alt="头像" class="avatar" loading="lazy" />
              </div>
              <!-- 环绕头像的微小卫星粒子 -->
              <span class="satellite satellite-1"></span>
              <span class="satellite satellite-2"></span>
            </div>
            <h3 class="name">周</h3>
            <button class="role-btn orbit-hover" @click="goHome">
              <span class="role-dot"></span>
              在校学生
            </button>
          </div>
        </SpaceGlass>
      </div>

      <!-- 右栏文本区 — 整块玻璃容器 -->
      <div class="content-col orbit-in delay-3" style="--orbit-angle: 110; --orbit-dist: 80">
        <SpaceGlass glow corner-stars>
          <h3 class="content-heading">
            <span class="orbit-icon"></span>
            从代码爱好者到工程化实践者
          </h3>

          <div class="bio-blocks">
            <div class="bio-block glow-track orbit-in delay-4" style="--orbit-angle: 90; --orbit-dist: 60">
              <div class="bio-icon">
                <svg class="bio-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <div class="bio-text">
                <p class="bio">
                  嗨，我是周，一个写 Vue 的前端开发。从大一下手写第一个 HTML 页面开始，我就喜欢上了那种"写几行代码就能看到效果"的感觉。现在主要用 Vue 3 全家桶干活，独立做过 AI 智学系统和云音乐 Web 端。
                </p>
              </div>
            </div>

            <div class="bio-block glow-track orbit-in delay-5" style="--orbit-angle: 70; --orbit-dist: 60">
              <div class="bio-icon">
                <svg class="bio-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                </svg>
              </div>
              <div class="bio-text">
                <p class="bio">
                  写代码之外，我更关注 AI 怎么改变开发本身。日常用 Vibe Coding 的方式工作——用自然语言描述意图，让 AI 生成代码，我来审查、调试、兜底。参加过 AI 创作大赛，也在尝试 RAG 这类 AI 应用方向。对我来说，AI 不是替代，是杠杆：一个人也能做出以前一个团队才搞定的东西。
                </p>
              </div>
            </div>
          </div>

          <!-- Highlights 标签 -->
          <div class="highlights orbit-in delay-6" style="--orbit-angle: 60; --orbit-dist: 40">
            <button class="hl-btn orbit-hover" v-for="(h, i) in ['项目驱动学习', '工程化开发', '快速成长']" :key="i">
              <span class="hl-dot"></span>
              {{ h }}
            </button>
          </div>

          <!-- 四组独立玻璃信息卡片 -->
          <div class="info-grid orbit-in delay-7" style="--orbit-angle: 45; --orbit-dist: 30">
            <div v-for="(item, idx) in info" :key="item.label" class="info-glass-card" :style="{ animationDelay: (0.1 * idx) + 's' }">
              <span class="igc-star"></span>
              <div class="info-icon-wrap">
                <el-icon :size="15"><component :is="item.icon" /></el-icon>
              </div>
              <div class="info-body">
                <span class="info-label">{{ item.label }}</span>
                <span class="info-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </SpaceGlass>
      </div>
    </div>

    <!-- 右下角悬浮行星 (蓝色人物行星) -->
    <PlanetMini color="#5db8ff" :size="38" type="rocky" @click="goHome" />
  </section>
</template>

<style scoped>
.about-page {
  justify-content: flex-start;
  padding-top: 140px;
  padding-bottom: 80px;
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

.about-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 48px;
  align-items: start;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* ===== 左栏头像区 ===== */
.avatar-col {
  position: sticky;
  top: 120px;
}

.avatar-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 36px 24px;
}

.avatar-frame {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 多层同心渐变环形轨道 */
.avatar-orbit-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid transparent;
  animation: orbit-spin linear infinite;
}

.avatar-orbit-1 {
  inset: -16px;
  border-image: linear-gradient(135deg, rgba(66,140,255,0.4), rgba(151,72,255,0.2)) 1;
  animation-duration: 8s;
}

.avatar-orbit-2 {
  inset: -26px;
  border-image: linear-gradient(225deg, rgba(151,72,255,0.3), rgba(66,140,255,0.15)) 1;
  animation-duration: 12s;
  animation-direction: reverse;
}

.avatar-orbit-3 {
  inset: -36px;
  border: 1px dashed rgba(66, 140, 255, 0.12);
  animation-duration: 18s;
}

@keyframes orbit-spin {
  to { transform: rotate(360deg); }
}

/* 头像光晕背景 */
.avatar-glow-bg {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(66, 140, 255, 0.2), transparent 70%);
  animation: breath-glow 3s ease-in-out infinite;
}

/* 头像边框 */
.avatar-border-ring {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  padding: 3px;
  background: var(--gradient-space);
  position: relative;
  z-index: 1;
  box-shadow: 0 0 30px rgba(66, 140, 255, 0.2);
  animation: ring-breath 4s ease-in-out infinite;
}

@keyframes ring-breath {
  0%, 100% { box-shadow: 0 0 20px rgba(66, 140, 255, 0.15); }
  50% { box-shadow: 0 0 45px rgba(151, 72, 255, 0.25); }
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

/* 环绕头像的微小卫星粒子 */
.satellite {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(200, 220, 255, 0.8);
  z-index: 0;
  animation: satellite-orbit 5s linear infinite;
}

.satellite-1 {
  animation-duration: 5s;
  animation-delay: 0s;
  box-shadow: 0 0 6px rgba(66, 140, 255, 0.6);
}
.satellite-2 {
  animation-duration: 7s;
  animation-delay: -3s;
  background: rgba(151, 72, 255, 0.7);
  box-shadow: 0 0 6px rgba(151, 72, 255, 0.5);
}

@keyframes satellite-orbit {
  0% { transform: rotate(0deg) translateX(110px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.role-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(66, 140, 255, 0.08);
  color: var(--accent);
  border: 1px solid rgba(66, 140, 255, 0.2);
  cursor: pointer;
  transition: all 0.35s var(--ease-out);
}

.role-btn:hover {
  background: rgba(66, 140, 255, 0.15);
  border-color: rgba(151, 72, 255, 0.4);
  box-shadow: 0 0 20px rgba(66, 140, 255, 0.15);
}

.role-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent-glow);
}

/* ===== 右栏内容 ===== */
.content-heading {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 28px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
}

.bio-blocks {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.bio-block {
  display: flex;
  gap: 16px;
}

.bio-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(66, 140, 255, 0.08);
  border: 1px solid rgba(66, 140, 255, 0.15);
  border-radius: 10px;
  color: var(--accent);
  transition: all 0.3s;
}

.bio-block:hover .bio-icon {
  border-color: rgba(151, 72, 255, 0.35);
  box-shadow: 0 0 16px rgba(66, 140, 255, 0.15);
}

.bio-icon-svg {
  width: 18px;
  height: 18px;
}

.bio {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 14px;
}

/* Highlights 标签 */
.highlights {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.hl-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 20px;
  background: rgba(0, 0, 14, 0.5);
  border: 1px solid rgba(66, 140, 255, 0.15);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.35s var(--ease-out);
}

.hl-btn:hover {
  border-color: rgba(151, 72, 255, 0.35);
  background: rgba(66, 140, 255, 0.1);
  box-shadow: 0 0 0 4px rgba(66, 140, 255, 0.08),
              0 0 20px rgba(151, 72, 255, 0.08);
  transform: translateY(-2px);
}

.hl-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent-glow);
}

/* 四组独立玻璃信息卡片 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.info-glass-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(0, 0, 14, 0.4);
  border: 1px solid rgba(66, 140, 255, 0.12);
  border-radius: var(--radius);
  backdrop-filter: blur(6px);
  transition: border-color 0.3s, box-shadow 0.3s;
  animation: line-fade-in 0.5s var(--ease-expo) forwards;
  opacity: 0;
}

.info-glass-card:hover {
  border-color: rgba(151, 72, 255, 0.3);
  box-shadow: 0 0 16px rgba(66, 140, 255, 0.08);
}

.igc-star {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(200, 220, 255, 0.5);
  animation: sg-star-twinkle 2.5s ease-in-out infinite;
}

.info-icon-wrap {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(66, 140, 255, 0.08);
  border-radius: 8px;
  color: var(--accent);
  flex-shrink: 0;
}

.info-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.info-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .avatar-col {
    position: static;
    display: flex;
    justify-content: center;
  }
  .avatar-inner {
    padding: 28px 20px;
  }
  .avatar-frame {
    width: 150px;
    height: 150px;
  }
  .avatar-border-ring {
    width: 140px;
    height: 140px;
  }
  .avatar-orbit-1 { inset: -12px; }
  .avatar-orbit-2 { inset: -20px; }
  .avatar-orbit-3 { inset: -28px; }
  .satellite { animation: none; display: none; }
  .info-grid { grid-template-columns: 1fr; }
  .content-heading { font-size: 18px; }
}

@keyframes sg-star-twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.9; transform: scale(1.3); }
}
</style>
