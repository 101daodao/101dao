<script setup>
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
</script>

<template>
  <section id="skills" class="section" style="background: var(--bg-soft);">
    <h2 class="section-title fade-up">技能栈</h2>
    <p class="section-subtitle fade-up delay-1">我的专业技能与技术能力</p>

    <div class="skills-grid">
      <div v-for="(cat, i) in categories" :key="cat.title"
        class="skill-card fade-up" :class="'delay-' + (i + 2)">
        <div class="card-header">
          <div class="icon-box">
            <el-icon :size="22" color="var(--primary)"><component :is="cat.icon" /></el-icon>
          </div>
          <h3>{{ cat.title }}</h3>
        </div>
        <div class="tag-list">
          <el-tag v-for="item in cat.items" :key="item" size="large" effect="plain" round class="tech-tag">
            {{ item }}
          </el-tag>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}
.skill-card {
  background: #fff; border-radius: var(--radius); padding: 28px;
  box-shadow: var(--shadow); transition: transform .25s, box-shadow .25s;
}
.skill-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(37,99,235,.12);
}
.card-header {
  display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
}
.icon-box {
  width: 42px; height: 42px; border-radius: 10px;
  background: var(--bg-soft); display: flex; align-items: center; justify-content: center;
}
.card-header h3 { font-size: 18px; font-weight: 700; }
.tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-tag {
  border-color: var(--primary-light); color: var(--primary);
  transition: transform .2s, background .2s;
}
.tech-tag:hover {
  transform: scale(1.05);
  background: rgba(37,99,235,.06);
}

@media (max-width: 768px) {
  .skills-grid { grid-template-columns: 1fr; }
}
</style>
