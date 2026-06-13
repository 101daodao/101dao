import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.css'

// 按需导入项目中实际使用的 Element Plus 图标
import {
  Close,
  Menu,
  ArrowRight,
  School,
  Collection,
  Message,
  ChatDotRound,
  Cpu,
  Grid,
  SetUp,
  View,
  Right,
  Link,
  Phone
} from '@element-plus/icons-vue'

const app = createApp(App)

// 只注册项目中实际使用的图标
const icons = {
  Close, Menu, ArrowRight, School, Collection, Message,
  ChatDotRound, Cpu, Grid, SetUp, View, Right, Link, Phone
}
for (const [key, comp] of Object.entries(icons)) {
  app.component(key, comp)
}

app.mount('#app')
