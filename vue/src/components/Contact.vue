<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Message } from '@element-plus/icons-vue'

const form = reactive({ name: '', email: '', message: '' })

const submit = () => {
  if (!form.name || !form.email || !form.message) {
    ElMessage.warning('请填写完整信息')
    return
  }
  ElMessage.success('消息已发送，感谢你的联系！')
  form.name = form.email = form.message = ''
}
</script>

<template>
  <section id="contact" class="section" style="background: var(--bg-soft);">
    <h2 class="section-title">联系我</h2>
    <p class="section-subtitle">有项目合作或想法？随时与我取得联系</p>

    <div class="contact-grid">
      <div class="contact-info">
        <div class="info-card">
          <el-icon :size="28" color="var(--primary)"><Message /></el-icon>
          <div>
            <div class="label">邮箱</div>
            <div class="val">hello@example.com</div>
          </div>
        </div>
        <div class="info-card">
          <el-icon :size="28" color="var(--primary)"><Location /></el-icon>
          <div>
            <div class="label">地址</div>
            <div class="val">北京市海淀区</div>
          </div>
        </div>
        <div class="info-card">
          <el-icon :size="28" color="var(--primary)"><ChatDotRound /></el-icon>
          <div>
            <div class="label">微信</div>
            <div class="val">dev_portfolio</div>
          </div>
        </div>
      </div>

      <div class="form-card">
        <el-input v-model="form.name" placeholder="你的姓名" size="large" :prefix-icon="User" />
        <el-input v-model="form.email" placeholder="邮箱地址" size="large" :prefix-icon="Message" />
        <el-input v-model="form.message" type="textarea" placeholder="想说的话..." :rows="4" resize="none" />
        <el-button type="primary" size="large" round @click="submit" style="width:100%">
          发送消息 <el-icon class="el-icon--right"><Promotion /></el-icon>
        </el-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px;
}
.contact-info { display: flex; flex-direction: column; gap: 16px; }
.info-card {
  display: flex; align-items: center; gap: 16px;
  background: #fff; padding: 20px 24px; border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.info-card .label { font-size: 13px; color: var(--text-secondary); }
.info-card .val { font-size: 15px; font-weight: 500; margin-top: 2px; }

.form-card {
  background: #fff; padding: 28px; border-radius: var(--radius);
  box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 16px;
}

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
}
</style>
