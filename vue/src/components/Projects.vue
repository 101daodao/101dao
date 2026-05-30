<script setup>
import schoolImg from '../image/school.webp'
import musicImg from '../image/music.webp'
import aiImg from '../image/ai.webp'
import huaweiImg from '../image/huawei.webp'

const projects = [
  {
    title: '仿写学校官网',
    desc: '采用 Bootstrap 框架进行响应式开发，完美适配手机、平板和电脑端。高度还原学校官网的布局与交互设计，包含导航栏、轮播图、新闻资讯、校园风采等核心模块，展现扎实的前端基础功底。',
    tags: ['Bootstrap', 'HTML5', 'CSS3', 'JavaScript'],
    color: '#2563eb',
    image: schoolImg,
    link: 'https://school.zdaow.xyz/'
  },
  {
    title: '101 云音乐',
    desc: '仿网易云音乐核心功能的在线音乐播放应用，实现歌曲播放、歌单管理、搜索发现、歌词同步等完整音乐体验。采用前后端分离架构，界面精美交互流畅，打造沉浸式音乐享受。',
    tags: ['Vue3', 'Pinia', 'Node.js', 'Vite',],
    color: '#e11d48',
    image: musicImg,
    link: 'https://music.zdaow.xyz/'
  },
  {
    title: 'AI 个性化学习系统',
    desc: 'Vue 3 全家桶 + Element Plus 搭建，从路由设计到状态管理全独立完成。接入了大模型 API，实现了 AI 问答和个性化学习推荐，用了 SSE 做流式对话。Composition API + 路由懒加载，该有的工程化都有。',
    tags: ['Vue3', 'Axios', 'AI API', 'Element Plus'],
    color: '#7c3aed',
    image: aiImg,
    link: 'https://www.zdaow.xyz/'
  },
  {
    title: '仿写华为官网',
    desc: '采用响应式布局技术完美还原华为官网设计，手机端和电脑端均可流畅使用。包含产品展示、导航交互、动画效果等完整页面模块，充分体现对现代企业级网站开发的理解与实践。',
    tags: ['Bootstrap', 'CSS3 动画', 'JavaScript', 'vue3', 'Element Plus'],
    color: '#cf0a2c',
    image: huaweiImg,
    link: 'https://huawei.zdaow.xyz/'
  }
]
</script>

<template>
  <section id="projects" class="section">
    <h2 class="section-title fade-up">作品集</h2>
    <p class="section-subtitle fade-up delay-1">展示我参与和主导的核心项目 · 点击卡片即可访问</p>

    <div class="project-grid">
      <a
        v-for="(p, i) in projects"
        :key="i"
        :href="p.link"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card fade-up"
        :class="'delay-' + (i + 2)"
      >
        <!-- 项目截图 -->
        <div class="card-image-wrap">
          <img :src="p.image" :alt="p.title" class="card-image" loading="lazy" />
          <div class="card-image-overlay" :style="{ background: `linear-gradient(135deg, ${p.color}cc, ${p.color}66)` }">
            <span class="visit-hint">
              <el-icon :size="18"><View /></el-icon>
              点击访问项目
            </span>
          </div>
        </div>

        <!-- 项目信息 -->
        <div class="card-body">
          <h3 class="card-title">{{ p.title }}</h3>
          <p v-typewriter="p.desc" class="desc"></p>
          <div class="tags">
            <el-tag v-for="t in p.tags" :key="t" size="small" effect="plain" round>{{ t }}</el-tag>
          </div>
        </div>

        <!-- 底部跳转提示 -->
        <div class="card-footer" :style="{ borderColor: p.color + '22' }">
          <span class="link-text" :style="{ color: p.color }">
            访问项目
            <el-icon :size="14"><Right /></el-icon>
          </span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.project-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  position: relative;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px rgba(37,99,235,.15);
}

/* ===== 项目截图 ===== */
.card-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f0f5ff;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .5s cubic-bezier(.16,1,.3,1);
}

.project-card:hover .card-image {
  transform: scale(1.05);
}

.card-image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .35s;
}

.project-card:hover .card-image-overlay {
  opacity: 1;
}

.visit-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  background: rgba(0,0,0,.25);
  backdrop-filter: blur(6px);
  padding: 8px 20px;
  border-radius: 24px;
  letter-spacing: .5px;
}

/* ===== 卡片内容 ===== */
.card-body {
  padding: 20px 22px 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text);
}

.desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 14px;
  min-height: 48px;
  flex: 1;
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: auto;
}

/* ===== 底部跳转 ===== */
.card-footer {
  padding: 14px 22px;
  border-top: 1px solid;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.link-text {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  transition: gap .3s;
}

.project-card:hover .link-text {
  gap: 8px;
}

/* ===== 响应式 ===== */
@media (max-width: 860px) {
  .project-grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}

@media (max-width: 480px) {
  .card-body {
    padding: 16px;
  }
  .card-title {
    font-size: 16px;
  }
  .desc {
    font-size: 13px;
  }
  .card-footer {
    padding: 12px 16px;
  }
}
</style>
