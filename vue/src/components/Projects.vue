<script setup>
const projects = [
  {
    title: '电商管理后台',
    desc: '基于 Vue3 + Element Plus 的全栈电商后台，支持商品、订单、数据看板管理',
    tags: ['Vue3', 'Element Plus', 'Node.js'],
    color: '#2563eb'
  },
  {
    title: 'AI 智能助手',
    desc: '集成大语言模型的对话应用，支持多轮对话、代码高亮与流式响应',
    tags: ['React', 'TypeScript', 'WebSocket'],
    color: '#7c3aed'
  },
  {
    title: '数据可视化平台',
    desc: '实时数据大屏与图表分析平台，支持自定义看板和数据源配置',
    tags: ['Vue3', 'ECharts', 'D3.js'],
    color: '#0891b2'
  },
  {
    title: '移动端社交 App',
    desc: '跨平台移动应用，支持即时通讯、动态发布、图片滤镜等功能',
    tags: ['React Native', 'Firebase', 'Expo'],
    color: '#e11d48'
  },
  {
    title: '开源组件库',
    desc: '轻量级 Vue3 组件库，包含 30+ 高质量组件，支持主题定制',
    tags: ['Vue3', 'Vite', 'TypeScript'],
    color: '#059669'
  },
  {
    title: '个人博客系统',
    desc: '支持 Markdown 写作的博客平台，集成评论、搜索与 SEO 优化',
    tags: ['Nuxt3', 'Tailwind', 'MDX'],
    color: '#d97706'
  }
]
</script>

<template>
  <section id="projects" class="section">
    <h2 class="section-title">精选作品</h2>
    <p class="section-subtitle">展示我参与和主导的优秀项目</p>

    <div class="project-grid">
      <div v-for="(p, i) in projects" :key="i" class="project-card">
        <div class="card-top" :style="{ background: `linear-gradient(135deg, ${p.color}, ${p.color}88)` }">
          <el-icon :size="36" color="#fff"><Monitor /></el-icon>
        </div>
        <div class="card-body">
          <h3>{{ p.title }}</h3>
          <p>{{ p.desc }}</p>
          <div class="tags">
            <el-tag v-for="t in p.tags" :key="t" size="small" effect="plain" round>{{ t }}</el-tag>
          </div>
          <div class="card-actions">
            <el-button type="primary" text size="small">
              查看详情 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
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
  box-shadow: var(--shadow); transition: transform .25s, box-shadow .25s;
}
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(37,99,235,.12);
}
.card-top {
  height: 120px; display: flex; align-items: center; justify-content: center;
}
.card-body { padding: 20px; }
.card-body h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.card-body p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.card-actions { padding-top: 4px; }

@media (max-width: 768px) {
  .project-grid { grid-template-columns: 1fr; }
}
</style>
