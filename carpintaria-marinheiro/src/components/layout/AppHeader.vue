<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MobileMenu from './MobileMenu.vue'
import LogoSaw from '@/components/ui/LogoSaw.vue'

const route  = useRoute()
const router = useRouter()
const mobileOpen = ref(false)
const scrolled   = ref(false)
const isHome = computed(() => route.path === '/')
const light  = computed(() => !scrolled.value && isHome.value)

const navLinks = [
  { label: 'Início',    to: '/' },
  { label: 'Sobre Nós', to: '/sobre' },
  { label: 'Serviços',  to: '/servicos' },
  { label: 'Projetos',  to: '/projetos' },
  { label: 'Contactos', to: '/contactos' },
]

function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="light ? 'bg-transparent py-6' : 'bg-white shadow-sm border-b border-brand-sand/50 py-3'"
  >
    <div class="container-site flex items-center justify-between">

      <!-- LOGO -->
      <button
        @click="router.push('/')"
        class="logo-trigger flex items-center gap-3"
        style="background:none;border:none;cursor:pointer;padding:0;outline:none"
      >
        <LogoSaw :light="light" :size="44" />
        <div class="flex flex-col leading-tight">
          <span
            class="font-sans font-semibold text-sm uppercase transition-colors duration-300"
            style="letter-spacing:0.2em"
            :style="{ color: light ? 'white' : '#2D2D2D' }"
          >CARPINTARIA</span>
          <span
            class="font-heading font-bold text-xl leading-tight transition-colors duration-300"
            :style="{ color: light ? '#D9703A' : '#8C5331' }"
          >MARINHEIRO</span>
        </div>
      </button>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <button
          v-for="link in navLinks"
          :key="link.to"
          @click="router.push(link.to)"
          class="relative font-sans text-xs font-medium uppercase transition-all duration-300 pb-1"
          style="background:none;border:none;cursor:pointer;padding:4px 0;outline:none"
          :style="{
            letterSpacing: '0.15em',
            color: route.path === link.to
              ? (light ? 'white' : '#2D2D2D')
              : (light ? 'rgba(255,255,255,0.7)' : 'rgba(45,45,45,0.6)'),
          }"
        >
          {{ link.label }}
          <span
            class="absolute left-0 -bottom-0.5 h-0.5 transition-all duration-300"
            style="background:#8C5331"
            :style="{ width: route.path === link.to ? '100%' : '0' }"
          />
        </button>
      </nav>

      <!-- CTA + hamburger -->
      <div class="flex items-center gap-4">
        <button
          @click="router.push('/contactos')"
          class="hidden md:inline-flex btn-primary py-3 px-6 text-xs"
          :style="light ? 'background:white;color:#2D2D2D' : ''"
          style="outline:none"
        >
          Pedir Orçamento
        </button>

        <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden p-2 flex flex-col gap-1.5"
          style="background:none;border:none;cursor:pointer;outline:none"
          aria-label="Menu"
        >
          <span class="block h-0.5 w-6 transition-all duration-300"
            :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"
            :style="{ background: light ? 'white' : '#2D2D2D' }" />
          <span class="block h-0.5 w-6 transition-all duration-300"
            :class="mobileOpen ? 'opacity-0' : ''"
            :style="{ background: light ? 'white' : '#2D2D2D' }" />
          <span class="block h-0.5 transition-all duration-300"
            :class="mobileOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-4'"
            :style="{ background: light ? 'white' : '#2D2D2D' }" />
        </button>
      </div>
    </div>
  </header>

  <MobileMenu :open="mobileOpen" :links="navLinks" @close="mobileOpen = false" />
</template>
