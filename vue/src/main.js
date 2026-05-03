import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import App from './App.vue'
import './assets/styles/global.css'

const app = createApp(App)
app.use(ElementPlus)
// 全局注册图标
for (const [key, comp] of Object.entries(Icons)) {
  app.component(key, comp)
}
app.mount('#app')
