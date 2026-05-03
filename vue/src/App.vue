<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutMe from './components/AboutMe.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import FooterSec from './components/FooterSec.vue'
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

<style>
/* 全局无额外样式，均由各组件 scoped 样式和 global.css 控制 */
</style>
