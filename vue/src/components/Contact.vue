<script setup>
const contacts = [
  { icon: 'Message', label: '邮箱', value: 'zdw060127@163.com', color: '#3b82f6' },
  { icon: 'Link', label: 'GitHub', value: 'github.com/101daodao/101daoAI', color: '#a1a1aa' },
  { icon: 'ChatDotRound', label: '微信', value: 'daow101', color: '#22c55e' },
  { icon: 'Phone', label: '电话', value: '暂无', color: '#ef4444' }
]
</script>

<template>
  <section id="contact" class="section contact-section" style="--section-glow: rgba(232, 213, 163, 0.06)">
    <div class="dust-line"></div>
    <h2 class="section-title fade-up">Contact</h2>
    <p class="section-subtitle fade-up delay-1">期待与你建立连接</p>

    <div class="contact-grid">
      <div
        v-for="(c, i) in contacts"
        :key="c.label"
        class="contact-card glow-track orbit-in"
        :class="'delay-' + (i + 2)"
        :style="{ '--orbit-angle': 20 + i * 40, '--orbit-dist': 40 + i * 10 }"
      >
        <div class="contact-glow" :style="{ background: `radial-gradient(circle at center, ${c.color}22, transparent 70%)` }"></div>

        <div class="contact-icon-box" :style="{ color: c.color, background: `${c.color}14` }">
          <el-icon :size="22"><component :is="c.icon" /></el-icon>
        </div>

        <div class="contact-info">
          <span class="contact-label">{{ c.label }}</span>
          <span class="contact-value">{{ c.value }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: var(--bg);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}

/* ===== Contact Card ===== */
.contact-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  padding: 24px 28px;
  border-radius: var(--radius);
  transition: border-color 0.35s, transform 0.35s var(--ease-out), box-shadow 0.35s;
  overflow: hidden;
  cursor: default;
}

.contact-card:hover {
  border-color: rgba(59, 130, 246, 0.2);
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.contact-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.contact-card:hover .contact-glow {
  opacity: 1;
}

.contact-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.25s var(--ease-spring);
}

.contact-card:hover .contact-icon-box {
  transform: scale(1.12);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.contact-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
}

.contact-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  word-break: break-all;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .contact-card {
    padding: 20px 22px;
  }
}
</style>
