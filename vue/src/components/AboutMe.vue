<script setup>
const info = [
  { icon: 'School', label: '学校', value: '辽宁建筑职业学院' },
  { icon: 'Collection', label: '专业', value: '软件技术（24级）' },
  { icon: 'Message', label: '邮箱', value: '3550420565@qq.com' },
  { icon: 'ChatDotRound', label: '微信', value: 'daow101' },
]
</script>

<template>
  <section id="about" class="section" style="--section-glow: rgba(93, 184, 255, 0.07)">
    <div class="dust-line"></div>
    <h2 class="section-title fade-up">About</h2>
    <p class="section-subtitle fade-up delay-1">一位热爱前端工程与 AI 协作的在校开发者</p>

    <div class="about-grid">
      <!-- Avatar Column — sweeps in from left arc -->
      <div class="avatar-col orbit-arc delay-2" style="--arc-deg: 35">
        <div class="avatar-frame">
          <div class="avatar-glow"></div>
          <div class="avatar-orbit"></div>
          <div class="avatar-ring">
            <img src="../image/tx.jpg" alt="头像" class="avatar" loading="lazy" />
          </div>
        </div>
        <div class="avatar-info">
          <h3 class="name">周</h3>
          <span class="role-badge">在校学生</span>
        </div>
      </div>

      <!-- Content Column — flies in from right orbit -->
      <div class="content-col orbit-in delay-3" style="--orbit-angle: 110; --orbit-dist: 80">
        <h3 class="content-heading">从代码爱好者到工程化实践者</h3>

        <div class="bio-blocks">
          <div class="bio-block glow-track orbit-in delay-4" style="--orbit-angle: 90; --orbit-dist: 60">
            <div class="bio-icon">
              <el-icon :size="18"><component :is="'Cpu'" /></el-icon>
            </div>
            <div class="bio-text">
              <p class="bio">
                嗨，我是周，一个写 Vue 的前端开发。从大一下手写第一个 HTML 页面开始，我就喜欢上了那种"写几行代码就能看到效果"的感觉。现在主要用 Vue 3 全家桶干活，独立做过 AI 智学系统和云音乐 Web 端。
              </p>
            </div>
          </div>

          <div class="bio-block glow-track orbit-in delay-5" style="--orbit-angle: 70; --orbit-dist: 60">
            <div class="bio-icon">
              <el-icon :size="18"><component :is="'SetUp'" /></el-icon>
            </div>
            <div class="bio-text">
              <p class="bio">
                写代码之外，我更关注 AI 怎么改变开发本身。日常用 Vibe Coding 的方式工作——用自然语言描述意图，让 AI 生成代码，我来审查、调试、兜底。参加过 AI 创作大赛，也在尝试 RAG 这类 AI 应用方向。对我来说，AI 不是替代，是杠杆：一个人也能做出以前一个团队才搞定的东西。
              </p>
            </div>
          </div>
        </div>

        <!-- Highlights -->
        <div class="highlights orbit-in delay-6" style="--orbit-angle: 60; --orbit-dist: 40">
          <div class="hl-item" v-for="(h, i) in ['项目驱动学习', '工程化开发', '快速成长']" :key="i">
            <span class="hl-dot"></span>
            {{ h }}
          </div>
        </div>

        <!-- Info Grid -->
        <div class="info-grid orbit-in delay-7" style="--orbit-angle: 45; --orbit-dist: 30">
          <div v-for="item in info" :key="item.label" class="info-card">
            <div class="info-icon-wrap">
              <el-icon :size="15"><component :is="item.icon" /></el-icon>
            </div>
            <div class="info-body">
              <span class="info-label">{{ item.label }}</span>
              <span class="info-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  align-items: start;
}

/* ===== Avatar ===== */
.avatar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: sticky;
  top: 100px;
}

.avatar-frame {
  position: relative;
}

.avatar-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow), transparent 70%);
  opacity: 0.5;
  animation: avatar-glow-pulse 3s ease-in-out infinite;
}

@keyframes avatar-glow-pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.95); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

/* Orbit ring */
.avatar-orbit {
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  border: 1.5px solid rgba(59, 130, 246, 0.18);
  animation: orbit-spin 8s linear infinite;
}

.avatar-orbit::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent-glow), 0 0 24px var(--accent-glow);
  transform: translateX(-50%);
}

@keyframes orbit-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.avatar-ring {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  padding: 3px;
  background: var(--gradient-accent);
  position: relative;
  animation: ring-breath 4s ease-in-out infinite;
}

@keyframes ring-breath {
  0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.15); }
  50% { box-shadow: 0 0 60px rgba(59, 130, 246, 0.3); }
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.role-badge {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid rgba(59, 130, 246, 0.15);
}

/* ===== Content ===== */
.content-heading {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

/* Bio blocks */
.bio-blocks {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.bio-block {
  display: flex;
  gap: 16px;
}

.bio-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  border-radius: 10px;
  color: var(--accent);
}

.bio {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 14px;
}

/* Highlights */
.highlights {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.hl-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  transition: border-color 0.25s, background 0.25s;
}
.hl-item:hover {
  border-color: rgba(59, 130, 246, 0.3);
  background: var(--bg-elevated);
}

.hl-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

/* Info grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-surface);
  border-radius: var(--radius);
  border: 1px solid var(--border-subtle);
  transition: border-color 0.25s;
}
.info-card:hover {
  border-color: rgba(59, 130, 246, 0.25);
}

.info-icon-wrap {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  border-radius: 8px;
  color: var(--accent);
  flex-shrink: 0;
}

.info-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.info-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .avatar-col {
    position: static;
  }

  .avatar-ring {
    width: 150px;
    height: 150px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .content-heading {
    text-align: center;
  }

  .bio-block {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
