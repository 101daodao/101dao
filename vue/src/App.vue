<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutMe from './components/AboutMe.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import ComingSoon from './components/ComingSoon.vue'
import FooterSec from './components/FooterSec.vue'

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        } else {
          e.target.classList.remove('visible')
        }
      })
    },
    { threshold: 0.15 }
  )
  document.querySelectorAll('.fade-up,.fade-left,.fade-right,.fade-scale,.orbit-in,.orbit-arc').forEach(el => observer.observe(el))

  /* Glow-track mouse follow */
  document.querySelectorAll('.glow-track').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mouse-x', x + '%')
      el.style.setProperty('--mouse-y', y + '%')
    })
  })
})
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <ComingSoon id="coming-soon-1" title="探索" en="Explore" color="#c8c8d0" icon="🔭" />
    <ComingSoon id="coming-soon-2" title="发现" en="Discover" color="#f0d8a8" icon="✨" />
    <AboutMe />
    <Skills />
    <Projects />
    <Contact />
    <ComingSoon id="coming-soon-3" title="未来" en="Future" color="#5588ee" icon="🌌" />
  </main>
  <FooterSec />
</template>
