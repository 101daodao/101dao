<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)
onMounted(() => { visible.value = true })

const go = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-bg">
      <div class="circle c1"></div>
      <div class="circle c2"></div>
      <div class="circle c3"></div>
    </div>
    <div class="hero-content" :class="{ show: visible }">
      <div class="tag"> 欢迎来到我的主页</div>
      <h1>你好，我是<br><span class="highlight">创意开发者</span></h1>
      <p>热衷于用代码创造优雅的数字体验，专注前端开发与交互设计</p>
      <div class="actions">
        <el-button type="primary" size="large" round @click="go('#projects')">
          查看作品 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
        <el-button size="large" round @click="go('#contact')">
          联系我
        </el-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  background: linear-gradient(160deg, #f0f5ff 0%, #fff 50%, #e8f0fe 100%);
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.circle {
  position: absolute; border-radius: 50%;
  background: linear-gradient(135deg, rgba(37,99,235,.12), rgba(96,165,250,.08));
}
.c1 { width: 600px; height: 600px; top: -150px; right: -100px; }
.c2 { width: 300px; height: 300px; bottom: -80px; left: -60px; }
.c3 { width: 200px; height: 200px; top: 40%; left: 60%; }

.hero-content {
  position: relative; text-align: center; padding: 0 24px;
  opacity: 0; transform: translateY(30px);
  transition: all .8s cubic-bezier(.16,1,.3,1);
}
.hero-content.show { opacity: 1; transform: translateY(0); }

.tag {
  display: inline-block; padding: 6px 16px; border-radius: 20px;
  background: rgba(37,99,235,.08); color: var(--primary);
  font-size: 14px; font-weight: 500; margin-bottom: 24px;
}
h1 {
  font-size: clamp(36px, 6vw, 64px); font-weight: 800;
  line-height: 1.15; margin-bottom: 20px; color: var(--text);
}
.highlight {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-content p {
  font-size: 18px; color: var(--text-secondary);
  max-width: 500px; margin: 0 auto 36px;
}
.actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

@media (max-width: 768px) {
  .hero-content p { font-size: 15px; }
}
</style>
