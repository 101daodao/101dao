<script setup>
const contacts = [
  { icon: 'Message', label: '邮箱', value: '3550420565@qq.com', color: '#2563eb' },
  { icon: 'Link', label: 'GitHub', value: 'github.com/zhoudaowu', color: '#333' },
  { icon: 'ChatDotRound', label: '微信', value: 'daow101', color: '#07c160' },
  { icon: 'Phone', label: '电话', value: '暂无', color: '#e11d48' },
]
</script>

<template>
  <section id="contact" class="section" style="background: var(--bg-soft);">
    <h2 class="section-title">联系我</h2>
    <p class="section-subtitle">期待与你交流，欢迎通过以下方式联系我</p>

    <div class="contact-grid">
      <div v-for="c in contacts" :key="c.label" class="contact-card">
        <div class="icon-box" :style="{ background: `${c.color}15` }">
          <el-icon :size="24" :color="c.color"><component :is="c.icon" /></el-icon>
        </div>
        <div class="info">
          <span class="label">{{ c.label }}</span>
          <span class="value">{{ c.value }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;
  max-width: 800px; margin: 0 auto;
}
.contact-card {
  display: flex; align-items: center; gap: 16px;
  background: #fff; padding: 22px 24px; border-radius: var(--radius);
  box-shadow: var(--shadow); transition: transform .2s;
}
.contact-card:hover { transform: translateY(-3px); }
.icon-box {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.info { display: flex; flex-direction: column; }
.label { font-size: 12px; color: var(--text-secondary); }
.value { font-size: 15px; font-weight: 600; margin-top: 2px; }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
}
</style>
