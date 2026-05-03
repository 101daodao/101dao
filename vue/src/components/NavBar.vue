<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileMenu = ref(false)

const links = [
  { label: '首页', href: '#hero' },
  { label: '关于', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '作品', href: '#projects' },
  { label: '联系', href: '#contact' }
]

const handleScroll = () => { scrolled.value = window.scrollY > 50 }

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const go = (href) => {
  mobileMenu.value = false
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <a class="logo" @click="go('#hero')">101dao</a>
      <nav class="nav-links" :class="{ open: mobileMenu }">
        <a v-for="l in links" :key="l.href" @click="go(l.href)">{{ l.label }}</a>
      </nav>
      <button class="menu-btn" @click="mobileMenu = !mobileMenu">
        <el-icon :size="22"><component :is="mobileMenu ? 'Close' : 'Menu'" /></el-icon>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed; top: 0; width: 100%; z-index: 999;
  transition: background .3s, box-shadow .3s;
}
.navbar.scrolled {
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 12px rgba(0,0,0,.06);
}
.nav-inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px;
}
.logo {
  font-size: 22px; font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  cursor: pointer;
}
.nav-links {
  display: flex; gap: 32px;
}
.nav-links a {
  font-size: 15px; font-weight: 500; color: var(--text-secondary);
  cursor: pointer; transition: color .2s; text-decoration: none;
}
.nav-links a:hover { color: var(--primary); }
.menu-btn {
  display: none; background: none; border: none; cursor: pointer;
  color: var(--text);
}

@media (max-width: 768px) {
  .menu-btn { display: block; }
  .nav-links {
    position: fixed; top: 0; right: -100%; width: 60%; height: 100vh;
    flex-direction: column; background: #fff; padding: 80px 32px 32px;
    gap: 24px; transition: right .3s; box-shadow: -4px 0 20px rgba(0,0,0,.08);
  }
  .nav-links.open { right: 0; }
}
</style>
