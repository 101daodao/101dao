<script setup>
const skills = [
  { name: 'Vue.js / Nuxt', level: 95, tag: '核心' },
  { name: 'TypeScript', level: 88, tag: '' },
  { name: 'React', level: 80, tag: '' },
  { name: 'CSS / Tailwind', level: 90, tag: '' },
  { name: 'Node.js', level: 75, tag: '' },
  { name: 'Git / CI·CD', level: 82, tag: '' }
]

const tags = ['ES6+', 'WebSocket', 'Vite', 'Webpack', 'REST API', 'GraphQL', 'Docker', 'Linux']
</script>

<template>
  <section id="skills" class="section" style="background: var(--bg-soft);">
    <h2 class="section-title">技能栈</h2>
    <p class="section-subtitle">我的专业技能与技术能力</p>

    <div class="skills-grid">
      <div v-for="s in skills" :key="s.name" class="skill-card">
        <div class="skill-head">
          <span class="name">{{ s.name }}</span>
          <el-tag v-if="s.tag" type="primary" size="small" effect="dark" round>{{ s.tag }}</el-tag>
        </div>
        <el-progress :percentage="s.level" :stroke-width="8" :show-text="true"
          color="linear-gradient(90deg, var(--primary), var(--primary-light))" />
      </div>
    </div>

    <div class="tags">
      <el-tag v-for="t in tags" :key="t" size="large" effect="plain" round class="tech-tag">
        {{ t }}
      </el-tag>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;
}
.skill-card {
  background: #fff; border-radius: var(--radius); padding: 20px 24px;
  box-shadow: var(--shadow); transition: transform .2s;
}
.skill-card:hover { transform: translateY(-2px); }
.skill-head {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;
}
.skill-head .name { font-weight: 600; font-size: 15px; }
.tags {
  display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 36px;
}
.tech-tag { border-color: var(--primary-light); color: var(--primary); }

@media (max-width: 768px) {
  .skills-grid { grid-template-columns: 1fr; }
}
</style>
