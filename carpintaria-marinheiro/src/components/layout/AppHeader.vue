<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import MobileMenu from './MobileMenu.vue'

const route  = useRoute()
const mobileOpen = ref(false)
const scrolled   = ref(false)
const isHome = computed(() => route.path === '/')

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
  <header :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
    scrolled || !isHome
      ? 'bg-white/97 backdrop-blur-sm shadow-sm border-b border-brand-sand/50 py-3'
      : 'bg-transparent py-6'
  ]">
    <div class="container-site flex items-center justify-between">

      <!-- ── LOGO ── -->
      <RouterLink to="/" class="flex items-center gap-3 group">
        <!-- Saw blade SVG — fiel ao logótipo -->
        <svg width="44" height="44" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="flex-shrink-0 transition-transform duration-400 group-hover:rotate-12">
          <!-- Outer serrated circle (teeth) -->
          <circle cx="40" cy="40" r="30" :stroke="scrolled || !isHome ? '#2D2D2D' : 'white'" stroke-width="2.5" fill="none"/>
          <!-- Teeth around the blade (12 teeth) -->
          <g :stroke="scrolled || !isHome ? '#2D2D2D' : 'white'" stroke-width="2" fill="none">
            <path d="M40 8 L37 2 L43 2 Z" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
            <path d="M40 72 L37 78 L43 78 Z" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
            <path d="M72 40 L78 37 L78 43 Z" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
            <path d="M8 40 L2 43 L2 37 Z" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
            <path d="M63.6 16.4 L67.3 11.3 L71.3 15.3 Z" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
            <path d="M16.4 63.6 L11.3 67.3 L15.3 71.3 Z" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
            <path d="M63.6 63.6 L71.3 67.3 L67.3 71.3 Z" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
            <path d="M16.4 16.4 L15.3 11.3 L11.3 15.3 Z" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
          </g>
          <!-- Inner blade segments (gullets) -->
          <circle cx="40" cy="40" r="18" :stroke="scrolled || !isHome ? '#2D2D2D' : 'white'" stroke-width="2" fill="none"/>
          <!-- Radial lines (blade slots) -->
          <g :stroke="scrolled || !isHome ? '#2D2D2D' : 'white'" stroke-width="1.5">
            <line x1="40" y1="22" x2="40" y2="11"/>
            <line x1="40" y1="58" x2="40" y2="69"/>
            <line x1="22" y1="40" x2="11" y2="40"/>
            <line x1="58" y1="40" x2="69" y2="40"/>
            <line x1="52.7" y1="27.3" x2="60.1" y2="19.9"/>
            <line x1="27.3" y1="52.7" x2="19.9" y2="60.1"/>
            <line x1="52.7" y1="52.7" x2="60.1" y2="60.1"/>
            <line x1="27.3" y1="27.3" x2="19.9" y2="19.9"/>
          </g>
          <!-- Center hole -->
          <circle cx="40" cy="40" r="5" :fill="scrolled || !isHome ? '#2D2D2D' : 'white'"/>
          <circle cx="40" cy="40" r="3" :fill="scrolled || !isHome ? 'white' : '#2D2D2D'" v-if="scrolled || !isHome"/>
          <circle cx="40" cy="40" r="3" fill="transparent" v-else/>
          <!-- Orange triangle decorations -->
          <polygon points="6,36 0,40 6,44" fill="#C4521A"/>
          <polygon points="74,36 80,40 74,44" fill="#C4521A"/>
        </svg>

        <!-- Logo text — fiel ao original -->
        <div class="flex flex-col leading-tight">
          <span :class="[
            'font-sans font-semibold text-sm tracking-[0.2em] uppercase transition-colors duration-300',
            scrolled || !isHome ? 'text-brand-charcoal' : 'text-white'
          ]">CARPINTARIA</span>
          <span :class="[
            'font-heading font-bold text-xl leading-tight transition-colors duration-300',
            scrolled || !isHome ? 'text-brand-orange' : 'text-brand-orange-light'
          ]">MARINHEIRO</span>
        </div>
      </RouterLink>

      <!-- ── Desktop nav ── -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink
          v-for="link in navLinks" :key="link.to" :to="link.to"
          :class="[
            'font-sans text-xs font-medium tracking-brand uppercase transition-all duration-300 relative group/link',
            scrolled || !isHome ? 'text-brand-charcoal/65 hover:text-brand-charcoal' : 'text-white/75 hover:text-white'
          ]"
        >
          {{ link.label }}
          <span :class="[
            'absolute -bottom-1 left-0 h-0.5 bg-brand-orange transition-all duration-300',
            route.path === link.to ? 'w-full' : 'w-0 group-hover/link:w-full'
          ]"/>
        </RouterLink>
      </nav>

      <!-- ── CTA + hamburger ── -->
      <div class="flex items-center gap-4">
        <RouterLink to="/contactos"
          :class="['hidden md:inline-flex btn-primary py-3 px-6 text-xs',
            !scrolled && isHome ? '!bg-white !text-brand-charcoal hover:!bg-brand-beige' : '']">
          Pedir Orçamento
        </RouterLink>

        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 flex flex-col gap-1.5" aria-label="Menu">
          <span :class="['block h-0.5 w-6 transition-all duration-300',
            mobileOpen ? 'rotate-45 translate-y-2' : '',
            scrolled || !isHome ? 'bg-brand-charcoal' : 'bg-white']"/>
          <span :class="['block h-0.5 w-6 transition-all duration-300',
            mobileOpen ? 'opacity-0 scale-x-0' : '',
            scrolled || !isHome ? 'bg-brand-charcoal' : 'bg-white']"/>
          <span :class="['block h-0.5 w-4 transition-all duration-300',
            mobileOpen ? '-rotate-45 -translate-y-2 w-6' : '',
            scrolled || !isHome ? 'bg-brand-charcoal' : 'bg-white']"/>
        </button>
      </div>
    </div>
  </header>

  <MobileMenu :open="mobileOpen" :links="navLinks" @close="mobileOpen = false" />
</template>
