<script setup>
const info = [
  { icon: 'User', label: '姓名', value: '张三' },
  { icon: 'Location', label: '城市', value: '北京' },
  { icon: 'Message', label: '邮箱', value: 'hello@example.com' },
  { icon: 'Briefcase', label: '职业', value: '前端工程师' }
]
</script>

<template>
  <section id="about" class="section">
    <h2 class="section-title">关于我</h2>
    <p class="section-subtitle">了解更多关于我的故事</p>

    <div class="about-grid">
      <div class="avatar-area">
        <div class="avatar">
          <el-icon :size="64" color="#fff"><User /></el-icon>
        </div>
      </div>
      <div class="info-area">
        <h3>一位热爱技术的开发者</h3>
        <p class="bio">
          拥有多年前端开发经验，专注于 Vue.js 生态和现代化 Web 应用开发。
          善于将设计转化为高质量的代码，追求极致的用户体验和代码质量。
          工作之余喜欢探索新技术、参与开源项目，持续学习和成长。
        </p>
        <div class="info-list">
          <div v-for="item in info" :key="item.label" class="info-item">
            <el-icon :size="18" color="var(--primary)"><component :is="item.icon" /></el-icon>
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid; grid-template-columns: 280px 1fr; gap: 48px; align-items: center;
}
.avatar-area { display: flex; justify-content: center; }
.avatar {
  width: 200px; height: 200px; border-radius: 24px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 12px 40px rgba(37,99,235,.2);
}
.info-area h3 {
  font-size: 22px; font-weight: 700; margin-bottom: 12px;
}
.bio {
  color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px; font-size: 15px;
}
.info-list { display: flex; flex-direction: column; gap: 12px; }
.info-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px;
}
.info-item .label { color: var(--text-secondary); min-width: 40px; }
.info-item .value { color: var(--text); font-weight: 500; }

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr; text-align: center;
  }
  .avatar { width: 160px; height: 160px; }
  .info-item { justify-content: center; }
}
</style>
