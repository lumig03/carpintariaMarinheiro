<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LogoSaw from '@/components/ui/LogoSaw.vue'
import company from '@/data/companyData'

const router  = useRouter()
const visible = ref(false)
onMounted(() => setTimeout(() => (visible.value = true), 80))

const heroImages = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=85',
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=85',
]
const current = ref(0)
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    current.value = (current.value + 1) % heroImages.length
  }, 6000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="relative min-h-screen flex items-end overflow-hidden">
    <!-- Background images -->
    <div class="absolute inset-0">
      <TransitionGroup name="hero-fade">
        <img
          v-for="(img, i) in heroImages" :key="img"
          v-show="i === current"
          :src="img"
          alt="Projeto Carpintaria Marinheiro"
          class="absolute inset-0 w-full h-full object-cover"
          :loading="i === 0 ? 'eager' : 'lazy'"
        />
      </TransitionGroup>
      <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/50 to-brand-dark/10" />
    </div>

    <!-- Spinning saw watermark — decorative, top right -->
    <div class="absolute top-28 right-8 md:right-20 opacity-10 pointer-events-none hidden md:block">
      <LogoSaw :light="true" :size="180" :spinning="true" />
    </div>

    <!-- Slide indicators -->
    <div class="absolute bottom-10 right-8 md:right-16 flex gap-2 z-10">
      <button
        v-for="(_, i) in heroImages" :key="i"
        @click="current = i"
        class="transition-all duration-300"
        :style="i === current ? 'width:2rem;height:2px;background:#8C5331' : 'width:0.75rem;height:2px;background:rgba(255,255,255,0.3)'"
        style="border:none;cursor:pointer;padding:0"
        :aria-label="`Imagem ${i + 1}`"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 container-site pb-24 md:pb-32 pt-40">
      <Transition
        enter-active-class="transition-all duration-1000 ease-out"
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="visible" class="max-w-3xl">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-8 h-0.5 bg-brand-orange" />
            <p class="font-sans text-xs uppercase text-brand-orange-light font-medium" style="letter-spacing:0.15em">
              Ponte de Lima · Mobiliário por Medida
            </p>
          </div>

          <h1 class="font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-7">
            Mobiliário por Medida<br>
            com <span class="italic" style="color:#D9703A">Design e Rigor</span>
          </h1>

          <p class="font-sans text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
            {{ company.description }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button @click="router.push('/contactos')" class="btn-primary">
              Pedir Orçamento
            </button>
            <button
              @click="router.push('/projetos')"
              class="btn-outline-light"
            >
              Ver Projetos
            </button>
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
.hero-fade-enter-from, .hero-fade-leave-to       { opacity: 0; }
</style>
