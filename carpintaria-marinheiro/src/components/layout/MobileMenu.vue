<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ open: Boolean, links: Array })
const emit  = defineEmits(['close'])
const route = useRoute()

watch(() => route.path, () => emit('close'))
watch(() => props.open, val => { document.body.style.overflow = val ? 'hidden' : '' })
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-450 ease-out"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <div v-if="open" class="fixed inset-0 z-40 bg-brand-dark flex flex-col">
      <!-- Top bar -->
      <div class="flex items-center justify-between px-6 pt-6 pb-8 border-b border-white/8">
        <RouterLink to="/" class="flex items-center gap-3">
          <!-- Saw blade mini -->
          <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="30" stroke="white" stroke-width="2.5" fill="none"/>
            <circle cx="40" cy="40" r="18" stroke="white" stroke-width="2" fill="none"/>
            <g stroke="white" stroke-width="1.5">
              <line x1="40" y1="22" x2="40" y2="11"/>
              <line x1="40" y1="58" x2="40" y2="69"/>
              <line x1="22" y1="40" x2="11" y2="40"/>
              <line x1="58" y1="40" x2="69" y2="40"/>
              <line x1="52.7" y1="27.3" x2="60.1" y2="19.9"/>
              <line x1="27.3" y1="52.7" x2="19.9" y2="60.1"/>
              <line x1="52.7" y1="52.7" x2="60.1" y2="60.1"/>
              <line x1="27.3" y1="27.3" x2="19.9" y2="19.9"/>
            </g>
            <g fill="white">
              <polygon points="40,8 37,2 43,2"/>
              <polygon points="40,72 37,78 43,78"/>
              <polygon points="72,40 78,37 78,43"/>
              <polygon points="8,40 2,43 2,37"/>
            </g>
            <polygon points="6,36 0,40 6,44" fill="#C4521A"/>
            <polygon points="74,36 80,40 74,44" fill="#C4521A"/>
            <circle cx="40" cy="40" r="5" fill="white"/>
            <circle cx="40" cy="40" r="3" fill="#1A1A1A"/>
          </svg>
          <div class="flex flex-col leading-tight">
            <span class="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-white/80">CARPINTARIA</span>
            <span class="font-heading font-bold text-lg text-brand-orange">MARINHEIRO</span>
          </div>
        </RouterLink>
        <button @click="$emit('close')" class="text-white/40 hover:text-white transition-colors p-1">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Nav links -->
      <nav class="flex-1 px-6 pt-4 flex flex-col">
        <RouterLink
          v-for="link in links" :key="link.to" :to="link.to"
          class="group flex items-center justify-between py-5 border-b border-white/6 last:border-0"
        >
          <span class="font-heading text-2xl text-white/70 group-hover:text-white transition-colors">{{ link.label }}</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
            class="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </RouterLink>
      </nav>

      <!-- Bottom CTA -->
      <div class="px-6 pb-10 pt-6">
        <RouterLink to="/contactos" class="btn-primary w-full text-center block">
          Pedir Orçamento
        </RouterLink>
      </div>
    </div>
  </Transition>
</template>
