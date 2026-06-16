<script setup>
import { ref, computed } from 'vue'
import schoolImg from '../image/school.webp'
import musicImg from '../image/music.webp'
import aiImg from '../image/ai.webp'
import ershouImg from '../image/ershou.png'
import SpaceGlass from './SpaceGlass.vue'
import PlanetMini from './PlanetMini.vue'
import projectsBg from '../image/作品.jpg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-cards'

const projects = [
  {
    title: '仿写学校官网', subtitle: 'Bootstrap 响应式开发',
    desc: '还原导航、轮播图、新闻资讯等核心模块',
    tags: ['Bootstrap', 'HTML5', 'CSS3', 'JavaScript'],
    color: '#428cff', image: schoolImg,
    link: 'https://school.zdaow.xyz/'
  },
  {
    title: '101 云音乐', subtitle: 'Vue3 全栈音乐平台',
    desc: '歌曲播放、歌单管理、歌词同步等完整体验',
    tags: ['Vue3', 'Pinia', 'Node.js', 'Vite'],
    color: '#e11d48', image: musicImg,
    link: 'https://music.zdaow.xyz/'
  },
  {
    title: 'AI 智学系统', subtitle: 'AI + Vue3 智能学习',
    desc: '接入大模型 API，SSE 流式对话，AI 个性化推荐',
    tags: ['Vue3', 'Axios', 'AI API', 'Element Plus'],
    color: '#9748ff', image: aiImg,
    link: 'https://www.zdaow.xyz/'
  },
  {
    title: '校园二手交易平台', subtitle: 'Vue3 校园交易',
    desc: '基于 Vue3 + Element Plus 构建，适配多端，支持商品发布与搜索',
    tags: ['Vue3', 'Element Plus', 'Vite', 'Axios'],
    color: '#22c55e', link: 'https://ershou.zdaow.xyz/',
    image: ershouImg
  }
]

const swiperRef = ref(null)
const activeIndex = ref(0)
const infoKey = ref(0)

const currentProject = computed(() => projects[activeIndex.value] || projects[0])

const navItems = computed(() => {
  const total = projects.length
  return projects.map((p, i) => {
    const offset = i - activeIndex.value
    let normOffset = offset
    if (normOffset > total / 2) normOffset -= total
    if (normOffset < -total / 2) normOffset += total
    const dist = Math.abs(normOffset)
    const opacity = dist === 0 ? 1 : Math.max(0.15, 0.65 - dist * 0.2)
    const scale = dist === 0 ? 1 : Math.max(0.55, 1 - dist * 0.15)
    const angleStep = 28
    const angle = normOffset * angleStep
    return { ...p, index: i, isActive: i === activeIndex.value, opacity, scale, angle }
  })
})

const onSwiper = (swiper) => { swiperRef.value = swiper }
const onSlideChange = (swiper) => { activeIndex.value = swiper.realIndex; infoKey.value++ }
const goToSlide = (index) => {
  if (index === activeIndex.value) return
  swiperRef.value?.slideToLoop(index)
}
const goHome = () => {
  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="projects" class="projects-page page-section">
    <!-- 页面背景 -->
    <div class="section-bg" :style="{ backgroundImage: `url(${projectsBg})` }"></div>
    <div class="page-corner-stars"></div>

    <h2 class="section-title fade-up">
      <span class="orbit-icon"></span>
      Projects
    </h2>
    <p class="section-subtitle fade-up delay-1">核心作品展示</p>

    <div class="showcase-area orbit-arc delay-2" style="--arc-deg: 20">
      <!-- 卡片舞台 -->
      <div class="card-stage">
        <swiper
          :modules="[EffectCards]"
          effect="cards"
          :grab-cursor="true"
          :loop="true"
          :cards-effect="{ perSlideOffset: 20, perSlideRotate: 8, rotate: true, slideShadows: false }"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
          class="project-swiper"
        >
          <swiper-slide v-for="(p, i) in projects" :key="i" class="proj-slide">
            <SpaceGlass :padded="false" :corner-stars="false">
              <div class="proj-card" :style="{ '--accent': p.color }">
                <div class="proj-media" :class="{ 'no-img': !p.image }">
                  <img v-if="p.image" :src="p.image" :alt="p.title" class="proj-img" loading="lazy" />
                  <div v-else class="proj-placeholder">
                    <svg viewBox="0 0 120 80" fill="none" class="ph-svg" :style="{ color: p.color + '55' }">
                      <rect x="4" y="4" width="112" height="72" rx="8" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
                      <path d="M36 56l12-10 9 9 16-14 13 11v13H36V56z" stroke="currentColor" stroke-width="1.2"/>
                      <circle cx="44" cy="28" r="6" stroke="currentColor" stroke-width="1.2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </SpaceGlass>
          </swiper-slide>
        </swiper>
      </div>

      <!-- 文字信息 -->
      <div class="text-info">
        <transition name="slide-up" mode="out-in">
          <div :key="'name-' + infoKey" class="text-inner">
            <span class="project-subtitle">{{ currentProject.subtitle }}</span>
            <h3 class="project-title">{{ currentProject.title }}</h3>
            <a :href="currentProject.link" target="_blank" rel="noopener noreferrer"
               class="view-btn" :style="{ '--btn-accent': currentProject.color }">
              <span>查看项目</span>
              <svg viewBox="0 0 20 20" fill="currentColor" class="play-icon">
                <path d="M6 4l10 6-10 6V4z"/>
              </svg>
            </a>
          </div>
        </transition>
      </div>

      <!-- 弧形导航 -->
      <div class="arc-nav">
        <button
          v-for="item in navItems" :key="item.index"
          class="nav-dot" :class="{ active: item.isActive }"
          :style="{
            '--dot-angle': item.angle + 'deg',
            '--dot-scale': item.scale,
            '--dot-accent': item.color,
            transform: `rotate(var(--dot-angle)) translateY(-72px) scale(var(--dot-scale))`,
            opacity: item.opacity,
            pointerEvents: item.opacity > 0.25 ? 'auto' : 'none'
          }"
          @click="goToSlide(item.index)"
        >
          <span class="sr-only">前往 {{ item.title }}</span>
        </button>
      </div>
    </div>

    <!-- 标签行 -->
    <div class="tags-row fade-up delay-3" :key="'tags-' + infoKey">
      <span v-for="(t, ti) in currentProject.tags" :key="t" class="tag-pill" :style="{ '--i': ti }">{{ t }}</span>
    </div>

    <!-- 右下角悬浮行星 (画布创意行星) -->
    <PlanetMini color="#d4b896" :size="44" type="gas" @click="goHome" />
  </section>
</template>

<style scoped>
.projects-page {
  justify-content: flex-start;
  padding-top: 140px;
  min-height: 100vh;
  overflow: hidden;
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

.showcase-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.card-stage {
  width: 100%;
  max-width: 600px;
  padding: 20px 0 8px;
  margin-bottom: 28px;
}

.project-swiper { width: 100%; }

.proj-slide {
  border-radius: 16px;
  overflow: hidden;
}

.project-swiper :deep(.swiper-slide) {
  border-radius: 16px;
  overflow: hidden;
  transition: filter 0.45s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
}

.project-swiper :deep(.swiper-slide:not(.swiper-slide-active)) .proj-card {
  filter: brightness(0.45);
}
.project-swiper :deep(.swiper-slide:not(.swiper-slide-active)) .proj-img {
  filter: brightness(0.45) saturate(0.6);
}

.project-swiper :deep(.swiper-slide-active) .proj-card {
  filter: brightness(1);
}

.proj-card {
  border-radius: 16px;
  overflow: hidden;
  transition: filter 0.35s ease;
}

.proj-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.proj-media.no-img {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #14141a, #0c0c10);
}

.proj-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.9);
  transition: filter 0.4s ease;
}

.project-swiper :deep(.swiper-slide-active) .proj-img {
  filter: brightness(1);
}

.proj-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ph-svg {
  width: 64px;
  height: 42px;
  opacity: 0.3;
}

/* 文字信息 */
.text-info {
  text-align: center;
  min-height: 140px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 48px;
  overflow: hidden;
}

.text-inner { text-align: center; }

.project-subtitle {
  display: block;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.project-title {
  font-size: clamp(30px, 6vw, 46px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  line-height: 1.15;
  margin: 0 0 22px;
}

.view-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: #d4d4d8;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
}

.view-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: var(--btn-accent);
  color: #fff;
  box-shadow: 0 0 20px color-mix(in srgb, var(--btn-accent) 12%, transparent);
  gap: 12px;
}

.play-icon { width: 14px; height: 14px; opacity: 0.7; transition: opacity 0.25s; }
.view-btn:hover .play-icon { opacity: 1; }

/* 过渡 */
.slide-up-enter-active {
  animation: name-slide-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
}
.slide-up-leave-active {
  animation: name-slide-up-out 0.25s cubic-bezier(0.7,0,0.84,0) forwards;
  position: absolute;
}

@keyframes name-slide-up {
  0% { opacity: 0; transform: translateY(24px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes name-slide-up-out {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-16px); }
}

/* 弧形导航 */
.arc-nav {
  position: relative;
  width: 260px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-dot {
  position: absolute;
  top: 50%; left: 50%;
  width: 26px; height: 26px;
  border-radius: 7px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  outline: none;
  transition: transform 0.48s cubic-bezier(0.34,1.56,0.64,1),
              background 0.3s ease, box-shadow 0.3s ease, opacity 0.32s ease;
}

.nav-dot:hover {
  background: rgba(66,140,255,0.2);
  border-color: rgba(151,72,255,0.3);
}

.nav-dot.active {
  background: rgba(66,140,255,0.3);
  border-color: rgba(151,72,255,0.5);
  box-shadow: 0 0 18px rgba(66,140,255,0.3), 0 0 48px rgba(151,72,255,0.1);
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

/* 标签行 */
.tags-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 500px;
  margin: 28px auto 0;
  position: relative;
  z-index: 2;
}

.tag-pill {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(66,140,255,0.05);
  border: 1px solid rgba(66,140,255,0.12);
  animation: tag-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: calc(var(--i, 0) * 0.05s);
  opacity: 0;
}

@keyframes tag-in {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* 响应式 */
@media (max-width: 800px) {
  .card-stage { max-width: 480px; }
  .arc-nav { width: 220px; height: 110px; }
  .nav-dot { width: 24px; height: 24px; }
  .nav-dot { transform: rotate(var(--dot-angle)) translateY(-62px) scale(var(--dot-scale)) !important; }
}
@media (max-width: 640px) {
  .card-stage { max-width: 380px; }
  .project-title { font-size: 28px; }
  .arc-nav { width: 190px; height: 95px; }
  .nav-dot { width: 22px; height: 22px; border-radius: 6px; }
  .nav-dot { transform: rotate(var(--dot-angle)) translateY(-56px) scale(var(--dot-scale)) !important; }
}
@media (max-width: 420px) {
  .card-stage { max-width: 300px; }
  .project-title { font-size: 24px; }
  .arc-nav { width: 160px; height: 85px; }
  .nav-dot { width: 20px; height: 20px; }
  .nav-dot { transform: rotate(var(--dot-angle)) translateY(-48px) scale(var(--dot-scale)) !important; }
}
</style>
