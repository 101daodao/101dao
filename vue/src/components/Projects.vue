<script setup>
const projects = [
  {
    title: '商品管理系统',
    desc: '独立完成的全栈商品管理后台，支持完整 CRUD、表单校验、Axios 请求封装、分页筛选等功能，实现前后端联调。',
    tags: ['Vue3', 'Vite', 'Pinia', 'Element Plus'],
    color: '#2563eb',
    highlights: ['完整 CRUD 操作', '请求封装 & 拦截器', '分页 & 筛选功能']
  },
  {
    title: '智学 AI 个性化学习系统',
    desc: '基于 AI 能力的个性化学习平台，根据用户学习行为智能推荐学习内容，支持多学科知识图谱与学习路径规划。',
    tags: ['Vue3', 'Axios', 'AI API', 'Vant'],
    color: '#7c3aed',
    highlights: ['AI 智能推荐算法', '个性化学习路径', '知识图谱可视化']
  },
  {
    title: '网易云音乐（仿写）',
    desc: '仿网易云音乐核心功能的音乐播放应用，实现歌曲播放、歌单管理、搜索、歌词同步等完整音乐体验。',
    tags: ['Vue3', 'Pinia', 'Node.js', 'Vite'],
    color: '#e11d48',
    highlights: ['音乐播放 & 歌词同步', '歌单管理', '搜索 & 推荐功能']
  }
]
</script>

<template>
  <section id="projects" class="section">
    <h2 class="section-title fade-up">精选作品</h2>
    <p class="section-subtitle fade-up delay-1">展示我参与和主导的核心项目</p>

    <div class="project-grid">
      <div v-for="(p, i) in projects" :key="i"
        class="project-card fade-up" :class="'delay-' + (i + 2)">
        <div class="card-top" :style="{ background: `linear-gradient(135deg, ${p.color}, ${p.color}99)` }">
          <div class="card-icon">
            <el-icon :size="32" color="#fff"><Monitor /></el-icon>
          </div>
        </div>
        <div class="card-body">
          <h3>{{ p.title }}</h3>
          <p class="desc">{{ p.desc }}</p>
          <ul class="highlights">
            <li v-for="h in p.highlights" :key="h">
              <el-icon :size="14" color="var(--primary)"><Select /></el-icon>
              {{ h }}
            </li>
          </ul>
          <div class="tags">
            <el-tag v-for="t in p.tags" :key="t" size="small" effect="plain" round>{{ t }}</el-tag>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;
}
.project-card {
  background: #fff; border-radius: var(--radius); overflow: hidden;
  box-shadow: var(--shadow); transition: transform .3s, box-shadow .3s;
}
.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(37,99,235,.15);
}
.card-top {
  height: 110px; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.card-top::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(255,255,255,.15) 0%, transparent 60%);
}
.card-icon { position: relative; z-index: 1; }
.card-body { padding: 20px; }
.card-body h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.desc { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px; }
.highlights {
  list-style: none; padding: 0; margin: 0 0 14px; display: flex; flex-direction: column; gap: 6px;
}
.highlights li {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--text);
}
.tags { display: flex; gap: 6px; flex-wrap: wrap; }

@media (max-width: 768px) {
  .project-grid { grid-template-columns: 1fr; }
}
</style>
