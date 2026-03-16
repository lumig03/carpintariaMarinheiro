<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import company from '@/data/companyData'

const visible = ref(false)
onMounted(() => setTimeout(() => (visible.value = true), 80))

const heroImages = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=85',
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=85',
]
const current = ref(0)
let timer = null
onMounted(() => { timer = setInterval(() => { current.value = (current.value + 1) % heroImages.length }, 6000) })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="relative min-h-screen flex items-end overflow-hidden">
    <!-- Background images -->
    <div class="absolute inset-0">
      <TransitionGroup name="hero-fade">
        <img v-for="(img, i) in heroImages" :key="img" v-show="i === current"
          :src="img" alt="Projeto Carpintaria Marinheiro"
          class="absolute inset-0 w-full h-full object-cover"
          :loading="i === 0 ? 'eager' : 'lazy'" />
      </TransitionGroup>
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/50 to-brand-dark/10" />
    </div>

    <!-- Slide indicators -->
    <div class="absolute bottom-10 right-8 md:right-16 flex gap-2 z-10">
      <button v-for="(_, i) in heroImages" :key="i" @click="current = i"
        :class="['transition-all duration-300', i === current ? 'w-8 h-0.5 bg-brand-orange' : 'w-3 h-0.5 bg-white/30 hover:bg-white/60']"
        :aria-label="`Imagem ${i + 1}`" />
    </div>

    <!-- Content -->
    <div class="relative z-10 container-site pb-24 md:pb-32 pt-40">
      <Transition enter-active-class="transition-all duration-1000 ease-out"
        enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
        <div v-if="visible" class="max-w-3xl">
          <!-- Label with orange accent -->
          <div class="flex items-center gap-3 mb-8">
            <div class="w-8 h-0.5 bg-brand-orange" />
            <p class="font-sans text-xs tracking-brand uppercase text-brand-orange-light font-medium">
              Ponte de Lima · Mobiliário por Medida
            </p>
          </div>

          <h1 class="font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-7 text-balance">
            Mobiliário por Medida<br>
            com <span class="italic text-brand-orange-light">Design e Rigor</span>
          </h1>

          <p class="font-sans text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
            {{ company.description }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink to="/contactos" class="btn-primary">
              Pedir Orçamento
            </RouterLink>
            <RouterLink to="/projetos" class="btn-outline-light">
              Ver Projetos
            </RouterLink>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Scroll line -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10">
      <div class="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
    </div>
  </section>
</template>

<style scoped>
.hero-fade-enter-active, .hero-fade-leave-active { transition: opacity 1.8s ease; }
.hero-fade-enter-from, .hero-fade-leave-to { opacity: 0; }
</style>
