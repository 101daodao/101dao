<script setup>
/**
 * PlanetMini — 内页右下角悬浮缩小版对应行星
 * 点击一键切回首页星系交互页
 */
import { computed } from 'vue'

const props = defineProps({
  /** 行星颜色 */
  color: { type: String, default: '#5db8ff' },
  /** 行星类型: rocky / gas / ice */
  type: { type: String, default: 'rocky' },
  /** 行星大小 */
  size: { type: Number, default: 40 },
  /** 是否显示轨道环 */
  ring: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

const gradient = computed(() => {
  switch (props.type) {
    case 'gas': return `radial-gradient(circle at 35% 35%, ${lighten(props.color, 35)}, ${props.color} 60%, ${darken(props.color, 45)})`
    case 'ice': return `radial-gradient(circle at 35% 35%, ${lighten(props.color, 40)}, ${props.color} 55%, ${darken(props.color, 40)})`
    default: return `radial-gradient(circle at 35% 35%, ${lighten(props.color, 45)}, ${props.color} 60%, ${darken(props.color, 50)})`
  }
})

function lighten(hex, amt) {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.min(255, (num >> 16) + amt)
  const g = Math.min(255, ((num >> 8) & 0xff) + amt)
  const b = Math.min(255, (num & 0xff) + amt)
  return `rgb(${r},${g},${b})`
}
function darken(hex, amt) {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.max(0, (num >> 16) - amt)
  const g = Math.max(0, ((num >> 8) & 0xff) - amt)
  const b = Math.max(0, (num & 0xff) - amt)
  return `rgb(${r},${g},${b})`
}
</script>

<template>
  <button class="planet-mini" :title="'返回首页星系'" @click="emit('click')">
    <!-- 轨道环 -->
    <span class="pm-orbit" :class="{ 'pm-orbit--ring': ring }">
      <span v-if="ring" class="pm-ring-line"></span>
    </span>
    <!-- 行星本体 -->
    <span
      class="pm-body"
      :style="{ width: size + 'px', height: size + 'px', background: gradient }"
    ></span>
    <!-- 光晕 -->
    <span class="pm-aura" :style="{ '--aura-color': color }"></span>
  </button>
</template>

<style scoped>
.planet-mini {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 500;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  outline: none;
}

.planet-mini:hover {
  transform: scale(1.2);
}

.planet-mini:active {
  transform: scale(0.95);
}

/* 轨道 */
.pm-orbit {
  position: absolute;
  inset: -4px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  animation: pm-spin 10s linear infinite;
}

.pm-orbit--ring {
  border-color: rgba(255, 255, 255, 0.08);
}

.pm-ring-line {
  position: absolute;
  inset: -6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 50%;
  transform: rotateX(70deg);
}

/* 行星本体 */
.pm-body {
  border-radius: 50%;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 16px var(--aura-color, rgba(93,184,255,0.4));
  transition: box-shadow 0.35s;
}

.planet-mini:hover .pm-body {
  box-shadow: 0 0 28px var(--aura-color, rgba(93,184,255,0.6)),
              0 0 48px var(--aura-color, rgba(93,184,255,0.2));
}

/* 呼吸光晕 */
.pm-aura {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--aura-color, rgba(93,184,255,0.25)), transparent 70%);
  animation: pm-breath 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pm-spin {
  to { transform: rotate(360deg); }
}

@keyframes pm-breath {
  0%, 100% { opacity: 0.3; transform: scale(0.9); }
  50% { opacity: 0.7; transform: scale(1.15); }
}

@media (max-width: 768px) {
  .planet-mini {
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
  }
}
</style>
