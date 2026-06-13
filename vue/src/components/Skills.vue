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
  <section id="skills" class="section skills-section">
    <!-- Subtle floating particles -->
    <div class="skills-bg">
      <span class="bg-particle" v-for="n in 6" :key="n" :style="{
        left: (n * 17 + (n % 3) * 5) + '%',
        animationDelay: (n * 0.7) + 's',
        animationDuration: (6 + n * 1.5) + 's',
        width: (4 + n % 3 * 3) + 'px',
        height: (4 + n % 3 * 3) + 'px'
      }"></span>
    </div>
    <h2 class="section-title fade-up">Skills</h2>
    <p class="section-subtitle fade-up delay-1">持续打磨的技术栈</p>

    <div class="skills-grid">
      <div
        v-for="(cat, i) in categories"
        :key="cat.title"
        class="skill-card glow-track fade-scale"
        :class="'delay-' + (i + 2)"
      >
        <!-- Glow border -->
        <div class="card-glow"></div>

        <!-- Header -->
        <div class="card-header">
          <div class="icon-box">
            <el-icon :size="18"><component :is="cat.icon" /></el-icon>
          </div>
          <span class="card-count">{{ String(cat.items.length).padStart(2, '0') }}</span>
        </div>

        <h3 class="card-title">{{ cat.title }}</h3>

        <!-- Tags -->
        <div class="tag-list">
          <span v-for="item in cat.items" :key="item" class="tech-tag">
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  background: var(--bg);
  position: relative;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  position: relative;
  z-index: 1;
}

/* ===== Card ===== */
.skill-card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  transition: border-color 0.35s, transform 0.35s var(--ease-out), box-shadow 0.35s;
  overflow: hidden;
}

.skill-card:hover {
  border-color: rgba(59, 130, 246, 0.25);
  transform: translateY(-6px);
  box-shadow: var(--shadow-glow);
}

/* Glow hover effect */
.card-glow {
  position: absolute;
  top: -80px;
  right: -80px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.skill-card:hover .card-glow {
  opacity: 0.6;
}

/* Header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  transition: transform 0.25s var(--ease-spring), background 0.25s;
}
.skill-card:hover .icon-box {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.15);
}

.card-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

/* Tags */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  background: rgba(59, 130, 246, 0.06);
  color: var(--accent);
  border: 1px solid rgba(59, 130, 246, 0.12);
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  cursor: default;
}

.tech-tag:hover {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.25);
  transform: translateY(-1px);
}

/* ===== Floating Background Particles ===== */
.skills-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.bg-particle {
  position: absolute;
  top: -20px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
  animation: particle-drift linear infinite;
}

@keyframes particle-drift {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.6);
  }
  10% {
    opacity: 0.15;
  }
  90% {
    opacity: 0.08;
  }
  100% {
    opacity: 0;
    transform: translateY(500px) scale(1.2);
  }
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  .skill-card {
    padding: 24px 22px;
  }
}
</style>
