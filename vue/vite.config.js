import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 分块策略
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('element-plus')) {
              return 'vendor-element-plus'
            }
            if (id.includes('@element-plus/icons-vue')) {
              return 'vendor-element-icons'
            }
            return 'vendor'
          }
        }
      }
    },
    // 设置 chunk 大小警告限制
    chunkSizeWarningLimit: 500,
  },
})
