/**
 * v-typewriter 指令
 * 用法:
 *   <p v-typewriter>静态文字</p>
 *   <p v-typewriter="dynamicText"></p>
 * 
 * 进入视口 → 逐字输出文字
 * 离开视口 → 清空文字，下次进入重新输出
 * 打字完成后无闪烁光标
 */
export const vTypewriter = {
  mounted(el, binding) {
    const speed = 28
    const fullText = typeof binding.value === 'string' ? binding.value : el.textContent.trim()

    // 初始清空
    el.textContent = ''
    el._twData = { fullText, timer: null, charIndex: 0 }

    el._twObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const data = el._twData
          if (!data) return

          if (entry.isIntersecting) {
            // 进入视口：清空并开始打字
            clearTimeout(data.timer)
            data.charIndex = 0
            el.textContent = ''

            const type = () => {
              if (data.charIndex < data.fullText.length) {
                el.textContent += data.fullText.charAt(data.charIndex)
                data.charIndex++
                data.timer = setTimeout(type, speed)
              }
            }
            // 延迟 400ms 等待 fade-up 入场动画
            data.timer = setTimeout(type, 400)
          } else {
            // 离开视口：停止打字并清空
            clearTimeout(data.timer)
            data.charIndex = 0
            el.textContent = ''
          }
        })
      },
      { threshold: 0.2 }
    )

    el._twObserver.observe(el)
  },

  unmounted(el) {
    if (el._twObserver) el._twObserver.disconnect()
    if (el._twData) clearTimeout(el._twData.timer)
  }
}
