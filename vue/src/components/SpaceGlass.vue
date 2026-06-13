<script setup>
/**
 * SpaceGlass — 统一半透黑磨砂玻璃容器组件
 * 内置蓝紫渐变边框、磨砂模糊、四角星点装饰
 *
 * Props:
 *  - glow: 是否显示 hover 星轨扩散光效
 *  - cornerStars: 是否显示四角闪烁星点
 *  - tag: 渲染为哪个 HTML 标签
 */
defineProps({
  glow: { type: Boolean, default: false },
  cornerStars: { type: Boolean, default: true },
  tag: { type: String, default: 'div' },
  padded: { type: Boolean, default: true },
})
</script>

<template>
  <component
    :is="tag"
    class="space-glass"
    :class="{ 'space-glass--glow': glow, 'space-glass--padded': padded }"
  >
    <!-- 四角星点装饰 -->
    <template v-if="cornerStars">
      <span class="sg-star sg-star--tl"></span>
      <span class="sg-star sg-star--tr"></span>
      <span class="sg-star sg-star--bl"></span>
      <span class="sg-star sg-star--br"></span>
    </template>
    <slot />
  </component>
</template>

<style scoped>
/* ============================================
   SpaceGlass — 半透黑磨砂玻璃 + 渐变细边框
   ============================================ */
.space-glass {
  position: relative;
  background: rgba(0, 0, 14, 0.65);
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border: 1px solid transparent;
  border-radius: 16px;
  overflow: hidden;
  z-index: 1;
}

/* 蓝紫渐变细边框 */
.space-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, #428cff 0%, #9748ff 50%, #428cff 100%);
  background-size: 200% 200%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  animation: sg-border-shift 4s ease-in-out infinite;
}

@keyframes sg-border-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.space-glass--padded {
  padding: 32px;
}

/* Hover 星轨扩散光效 */
.space-glass--glow {
  transition: box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.space-glass--glow:hover {
  box-shadow:
    0 0 0 2px rgba(66, 140, 255, 0.15),
    0 0 30px rgba(66, 140, 255, 0.08),
    0 0 60px rgba(151, 72, 255, 0.05);
}

/* ===== 四角星点 ===== */
.sg-star {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(200, 220, 255, 0.6);
  z-index: 3;
  pointer-events: none;
  animation: sg-star-twinkle 3s ease-in-out infinite;
}

.sg-star--tl { top: 12px; left: 12px; animation-delay: 0s; }
.sg-star--tr { top: 12px; right: 12px; animation-delay: 0.8s; }
.sg-star--bl { bottom: 12px; left: 12px; animation-delay: 1.6s; }
.sg-star--br { bottom: 12px; right: 12px; animation-delay: 2.4s; }

@keyframes sg-star-twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.9; transform: scale(1.3); }
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .space-glass--padded {
    padding: 24px;
  }
}
</style>
