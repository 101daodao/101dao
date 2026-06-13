<template>
  <footer class="footer fade-up">
    <div class="footer-inner">
      <div class="footer-left">
        <span class="brand">
          <span class="brand-dot"></span>
          101dao
        </span>
        <span class="divider">·</span>
        <span class="copy">© {{ year }} 用代码创造价值</span>
      </div>
      <div class="footer-right">
        <a href="https://github.com/101daodao/101daoAI" target="_blank"
           rel="noopener noreferrer" class="footer-link" aria-label="GitHub">
          <span class="link-label">GitHub</span>
          <svg class="link-arrow" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="mailto:3550420565@qq.com" class="footer-link" aria-label="Email">
          <span class="link-label">Email</span>
          <svg class="link-arrow" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 14, 0.5);
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border-top: 1px solid rgba(66, 140, 255, 0.12);
  padding: 32px 24px;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.brand-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--space-blue);
  box-shadow: 0 0 8px rgba(66, 140, 255, 0.5);
}

.divider {
  color: var(--text-muted);
  font-weight: 300;
}

.copy {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 400;
}

.footer-right {
  display: flex;
  gap: 24px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.25s, gap 0.25s;
}

.footer-link:hover {
  color: var(--space-blue);
  gap: 6px;
}

.link-arrow {
  width: 12px;
  height: 12px;
  transition: transform 0.25s;
}

.footer-link:hover .link-arrow {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 12px;
  }
  .footer-left { justify-content: center; }
  .footer-right { justify-content: center; }
}
</style>
