<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const cursorRef = ref(null)
const capsuleRef = ref(null)
const scrollProgress = ref(0)

const links = [
  { label: '首页', href: '#hero' },
  { label: '关于', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '作品', href: '#projects' },
  { label: '联系', href: '#contact' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0
}
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const go = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

/* ---- Hover cursor animation ---- */
const setCursor = (el) => {
  if (!el || !cursorRef.value || !capsuleRef.value) return
  const capsuleRect = capsuleRef.value.getBoundingClientRect()
  const linkRect = el.getBoundingClientRect()
  cursorRef.value.style.left = (linkRect.left - capsuleRect.left) + 'px'
  cursorRef.value.style.width = linkRect.width + 'px'
  cursorRef.value.style.opacity = '1'
}

const resetCursor = () => {
  if (!cursorRef.value) return
  cursorRef.value.style.opacity = '0'
}

onMounted(() => {
  const firstLink = capsuleRef.value?.querySelector('.nav-item')
  if (firstLink && cursorRef.value && capsuleRef.value) {
    const capsuleRect = capsuleRef.value.getBoundingClientRect()
    const linkRect = firstLink.getBoundingClientRect()
    cursorRef.value.style.left = (linkRect.left - capsuleRect.left) + 'px'
    cursorRef.value.style.width = linkRect.width + 'px'
  }
})
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <!-- Scroll Progress Bar -->
    <div class="scroll-bar" :style="{ width: scrollProgress + '%' }"></div>
    <div class="nav-inner">
      <!-- Pure glass capsule, no dark bg -->
      <nav class="nav-capsule" ref="capsuleRef">
        <div class="nav-cursor" ref="cursorRef"></div>
        <a
          v-for="l in links"
          :key="l.href"
          class="nav-item"
          @click="go(l.href)"
          @mouseenter="(e) => setCursor(e.currentTarget)"
          @mouseleave="resetCursor"
        >
          {{ l.label }}
        </a>
      </nav>
    </div>
    <!-- 全站统一蓝→紫水平渐变发光分割线 -->
    <div class="nav-gradient-line" :class="{ scrolled }"></div>
  </header>
</template>

<style scoped>
/* ==========================================
   NavBar — Pure glass, no dark background
   ========================================== */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 24px 0;
  transition: padding 0.4s cubic-bezier(0.16,1,0.3,1);
}

/* Scroll Progress Bar */
.scroll-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--gradient-accent);
  border-radius: 0 2px 2px 0;
  transition: width 0.15s linear;
  z-index: 1000;
  box-shadow: 0 0 8px var(--accent-glow);
}

/* No background on default — only subtle blur on scroll */
.navbar.scrolled {
  padding: 10px 0;
  background: rgba(8, 8, 12, 0.5);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}

/* ===== Capsule — pure glass, no dark fill ===== */
.nav-capsule {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

/* ===== Hover Cursor — bright glow highlight ===== */
.nav-cursor {
  position: absolute;
  bottom: 6px;
  height: 32px;
  border-radius: 22px;
  background: rgba(148, 163, 240, 0.18);
  border: 1px solid rgba(148, 163, 240, 0.3);
  box-shadow: 0 0 16px rgba(148, 163, 240, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
  opacity: 0;
  transition: left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1.2),
              width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1.2),
              opacity 0.25s;
  pointer-events: none;
  z-index: 0;
}

/* ===== Nav Items ===== */
.nav-item {
  position: relative;
  z-index: 1;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(200, 205, 220, 0.65);
  cursor: pointer;
  text-decoration: none;
  border-radius: 22px;
  transition: color 0.35s;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.nav-item:hover {
  color: rgba(240, 242, 255, 0.95);
  text-shadow: 0 0 12px rgba(148, 163, 240, 0.3);
}

/* ===== Mobile Toggle — removed ===== */
/* ===== Responsive ===== */
@media (max-width: 768px) {
  .nav-item { padding: 6px 12px; font-size: 12px; }
  .nav-capsule { padding: 4px; }
}
</style>
