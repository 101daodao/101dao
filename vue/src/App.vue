<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutMe from './components/AboutMe.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import ComingSoon from './components/ComingSoon.vue'
import FooterSec from './components/FooterSec.vue'
import SpaceBackground from './components/SpaceBackground.vue'
import commonBg from './image/通用.jpg'

/**
 * 全站背景控制
 * 首页: 透明度 100%, 完整渲染 + 通用底纹
 * 内页: 底纹 50% + canvas 星空叠加 15%
 */
const isHome = ref(true)
const heroVisible = ref(true)
const isMobile = ref(false)

const bgOpacity = computed(() => isHome.value ? 1 : 0.15)
const bgReduced = computed(() => !isHome.value)
const bgImg = computed(() => `url(${commonBg})`)

/* 通过 IntersectionObserver 判断当前在首页还是内页 */
let heroObserver = null
let mobileQuery = null

onMounted(() => {
  /* 移动端检测 */
  mobileQuery = window.matchMedia('(max-width: 768px)')
  isMobile.value = mobileQuery.matches
  const onMobileChange = (e) => { isMobile.value = e.matches }
  mobileQuery.addEventListener('change', onMobileChange)

  /* 入场动画观察器 */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        } else {
          e.target.classList.remove('visible')
        }
      })
    },
    { threshold: 0.15 }
  )
  document.querySelectorAll('.fade-up,.fade-left,.fade-right,.fade-scale,.orbit-in,.orbit-arc').forEach(el => observer.observe(el))

  /* Glow-track mouse follow */
  document.querySelectorAll('.glow-track').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mouse-x', x + '%')
      el.style.setProperty('--mouse-y', y + '%')
    })
  })

  /* 监听首页可见性 — 控制星空透明度 */
  const heroEl = document.getElementById('hero')
  if (heroEl) {
    heroObserver = new IntersectionObserver(
      (entries) => {
        heroVisible.value = entries[0].isIntersecting
        isHome.value = entries[0].isIntersecting
      },
      { threshold: [0, 0.2, 0.5, 0.8] }
    )
    heroObserver.observe(heroEl)
  }
})

onUnmounted(() => {
  if (heroObserver) heroObserver.disconnect()
  if (mobileQuery) mobileQuery.removeEventListener('change', () => {})
})
</script>

<template>
  <!-- 全站底纹（内页时显示，确保背景不丢失） -->
  <div class="global-star-bg" :class="{ 'is-inner': !isHome }" :style="{ backgroundImage: bgImg }"></div>

  <!-- 全站统一星空 canvas 动态层 -->
  <SpaceBackground
    :opacity="bgOpacity"
    :reduced="bgReduced"
    :parallax-reverse="!isHome"
  />

  <NavBar />
  <main>
    <HeroSection :is-home="isHome" :is-mobile="isMobile" />
    <AboutMe />
    <Skills />
    <Projects />
    <Contact />
    <!-- 未开发页面放最后 -->
    <ComingSoon id="coming-soon-1" title="探索" en="Explore" color="#c8c8d0" icon="🔭" />
    <ComingSoon id="coming-soon-2" title="发现" en="Discover" color="#f0d8a8" icon="✨" />
    <ComingSoon id="coming-soon-3" title="未来" en="Future" color="#5588ee" icon="🌌" />
  </main>
  <FooterSec />
</template>

<style>
/* ── 全局底纹 — 始终显示，消除所有断层 ── */
.global-star-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.global-star-bg.is-inner {
  opacity: 0.5;
}

/* 主内容层置于星空之上 */
main {
  position: relative;
  z-index: 1;
}
</style>
