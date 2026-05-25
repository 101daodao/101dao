import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 启用 minify 压缩（Vite 8 默认使用 rolldown 内置压缩）
    minify: true,
    // 设置较小的 chunk 大小警告阈值
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // 分包策略：将第三方库拆分，优化缓存
        manualChunks(id) {
          if (id.includes('node_modules/vue/')) return 'vue-vendor'
          if (id.includes('node_modules/element-plus/')) return 'element-plus'
          if (id.includes('node_modules/@element-plus/icons-vue/')) return 'element-icons'
        },
        // 文件命名含 hash，利于缓存
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          if (/\.(png|jpe?g|svg|gif|webp|ico)$/i.test(name)) {
            return `assets/images/[name]-[hash][extname]`
          } else if (/\.css$/i.test(name)) {
            return `assets/css/[name]-[hash][extname]`
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
    // CSS 代码拆分
    cssCodeSplit: true,
    // 资源内联阈值（小于 4KB 的资源转为 base64）
    assetsInlineLimit: 4096,
    // Sourcemap 生产环境关闭
    sourcemap: false,
  },
})
