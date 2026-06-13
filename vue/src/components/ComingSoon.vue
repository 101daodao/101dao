<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, default: '即将上线' },
  en: { type: String, default: 'Coming Soon' },
  color: { type: String, default: '#5db8ff' },
  icon: { type: String, default: '🚀' },
})
</script>

<template>
  <section :id="id" class="coming-soon">
    <div class="cs-bg" :style="{ '--accent': color }"></div>
    <div class="cs-content fade-up">
      <div class="cs-icon">{{ icon }}</div>
      <h2 class="cs-title">
        {{ title }}
        <span class="cs-en">{{ en }}</span>
      </h2>
      <p class="cs-desc">此页面正在建设中，更多精彩内容即将揭晓。</p>
      <div class="cs-orbit">
        <div class="cs-planet" :style="{ background: color }"></div>
        <div class="cs-ring"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.coming-soon {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #06080e;
}

.cs-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 40%, var(--accent, #5db8ff)08, transparent 60%),
    radial-gradient(ellipse 40% 30% at 30% 70%, var(--accent, #5db8ff)05, transparent 50%),
    radial-gradient(ellipse 30% 40% at 70% 60%, var(--accent, #5db8ff)04, transparent 50%);
  opacity: 0.6;
  pointer-events: none;
}

.cs-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 24px;
}

.cs-icon {
  font-size: 56px;
  margin-bottom: 24px;
  filter: drop-shadow(0 0 20px var(--accent, #5db8ff)55);
  animation: cs-float 3s ease-in-out infinite;
}

@keyframes cs-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.cs-title {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 700;
  color: rgba(244, 244, 245, 0.92);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.cs-en {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(160, 170, 200, 0.4);
  letter-spacing: 0.12em;
  margin-top: 6px;
}

.cs-desc {
  font-size: 14px;
  color: rgba(160, 170, 200, 0.5);
  margin-bottom: 48px;
  letter-spacing: 0.04em;
}

/* mini planet + orbit animation */
.cs-orbit {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.cs-ring {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 50%;
  animation: cs-spin 8s linear infinite;
}

@keyframes cs-spin {
  to { transform: rotate(360deg); }
}

.cs-planet {
  position: absolute;
  top: 8px;
  left: 50%;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border-radius: 50%;
  box-shadow: 0 0 24px var(--accent, #5db8ff)66, 0 0 8px var(--accent, #5db8ff)33;
  animation: cs-orbit-planet 4s ease-in-out infinite;
}

@keyframes cs-orbit-planet {
  0%, 100% { transform: translateX(-44px); }
  50% { transform: translateX(44px); }
}

/* fade-up animation */
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
              transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
