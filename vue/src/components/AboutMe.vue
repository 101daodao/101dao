<script setup>
const info = [
  { icon: 'School', label: '学校', value: '辽宁建筑职业学院' },
  { icon: 'Collection', label: '专业', value: '软件技术（24级）' },
  { icon: 'Message', label: '邮箱', value: '3550420565@qq.com' },
  { icon: 'ChatDotRound', label: '微信', value: 'daow101' },
]
</script>

<template>
  <section id="about" class="section">
    <h2 class="section-title">关于我</h2>
    <p class="section-subtitle">了解更多关于我的故事</p>

    <div class="about-grid">
      <div class="avatar-area">
        <img src="../image/tx.jpg" alt="头像" class="avatar" />
        <h3 class="name">周</h3>
        <span class="title-tag">前端开发工程师</span>
      </div>
      <div class="info-area">
        <h3>一位热爱前端的开发者</h3>
        <p class="bio">
          我是辽宁建筑职业学院软件技术专业24级学生。从大一接触 HTML/CSS 开始，就被"所见即所得"的前端魅力吸引。我主学 Vue3 技术栈，并独立完成了完整的商品管理系统（前后端联调）。课余我参加过 AI 创作大赛，习惯用工程化思维（Git、ESLint、Vite）提升代码质量。
        </p>
        <p class="bio">
          我虽然还在读书，但已经多个项目的开发经验，渴望在一个有爱的技术团队里快速成长。
        </p>
        <div class="highlights">
          <div class="hl-item">
            <el-icon :size="18" color="var(--primary)"><Trophy /></el-icon>
            <span>项目驱动学习</span>
          </div>
          <div class="hl-item">
            <el-icon :size="18" color="var(--primary)"><Cpu /></el-icon>
            <span>工程化开发习惯</span>
          </div>
          <div class="hl-item">
            <el-icon :size="18" color="var(--primary)"><Promotion /></el-icon>
            <span>快速成长能力</span>
          </div>
        </div>
        <div class="info-list">
          <div v-for="item in info" :key="item.label" class="info-item">
            <el-icon :size="16" color="var(--primary)"><component :is="item.icon" /></el-icon>
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
  display: grid; grid-template-columns: 260px 1fr; gap: 48px; align-items: start;
}
.avatar-area {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.avatar {
  width: 180px; height: 180px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 12px 40px rgba(37,99,235,.2);
  border: 4px solid #fff;
}
.name { font-size: 22px; font-weight: 700; margin: 0; }
.title-tag {
  padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 500;
  background: rgba(37,99,235,.08); color: var(--primary);
}
.info-area h3 { font-size: 22px; font-weight: 700; margin-bottom: 16px; }
.bio {
  color: var(--text-secondary); line-height: 1.8; margin-bottom: 12px; font-size: 15px;
}
.highlights { display: flex; gap: 16px; margin: 20px 0; flex-wrap: wrap; }
.hl-item {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 8px;
  background: var(--bg-soft); font-size: 13px; font-weight: 500;
}
.info-list { display: flex; flex-direction: column; gap: 10px; }
.info-item {
  display: flex; align-items: center; gap: 10px; font-size: 14px;
}
.info-item .label { color: var(--text-secondary); min-width: 40px; }
.info-item .value { color: var(--text); font-weight: 500; }

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; text-align: center; }
  .avatar { width: 140px; height: 140px; }
  .hl-item { justify-content: center; }
  .info-item { justify-content: center; }
}
</style>
