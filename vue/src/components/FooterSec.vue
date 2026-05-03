<template>
  <footer class="footer">
    <div class="inner">
      <span class="brand">Portfolio</span>
      <span class="copy">© {{ year }} All rights reserved.</span>
      <div class="links">
        <a href="#" aria-label="GitHub"><el-icon :size="18"><Link /></el-icon></a>
        <a href="#" aria-label="Email"><el-icon :size="18"><Message /></el-icon></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--text); color: rgba(255,255,255,.7); padding: 32px 24px;
}
.inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
.brand {
  font-weight: 800; font-size: 18px;
  background: linear-gradient(135deg, var(--primary-light), #93c5fd);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.copy { font-size: 13px; }
.links { display: flex; gap: 16px; }
.links a {
  color: rgba(255,255,255,.6); transition: color .2s;
}
.links a:hover { color: var(--primary-light); }

@media (max-width: 768px) {
  .inner { justify-content: center; text-align: center; }
}
</style>
