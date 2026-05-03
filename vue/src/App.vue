<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutMe from './components/AboutMe.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
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
  document.querySelectorAll('.fade-up,.fade-left,.fade-right,.fade-scale').forEach(el => observer.observe(el))
})
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <AboutMe />
    <Skills />
    <Projects />
    <Contact />
  </main>
  <FooterSec />
</template>
