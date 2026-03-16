<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LogoSaw from '@/components/ui/LogoSaw.vue'

const props  = defineProps({ open: Boolean, links: Array })
const emit   = defineEmits(['close'])
const route  = useRoute()
const router = useRouter()

watch(() => route.path, () => emit('close'))
watch(() => props.open, val => { document.body.style.overflow = val ? 'hidden' : '' })

function goTo(path) {
  router.push(path)
  emit('close')
}
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
      <!-- Header -->
      <div class="flex items-center justify-between px-6 pt-6 pb-8 border-b border-white/8">
        <button @click="goTo('/')" class="flex items-center gap-3" style="background:none;border:none;cursor:pointer;padding:0">
          <LogoSaw :light="true" :size="36" />
          <div class="flex flex-col leading-tight">
            <span class="font-sans font-semibold text-xs text-white/70" style="letter-spacing:0.2em">CARPINTARIA</span>
            <span class="font-heading font-bold text-lg" style="color:#8C5331">MARINHEIRO</span>
          </div>
        </button>
        <button @click="$emit('close')"
          class="text-white/40 hover:text-white transition-colors p-1"
          style="background:none;border:none;cursor:pointer"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Nav links -->
      <nav class="flex-1 px-6 pt-4 flex flex-col">
        <button v-for="link in links"
          :key="link.to"
          @click="goTo(link.to)"
          class="flex items-center justify-between py-5 border-b border-white/6 last:border-0 w-full text-left"
          style="background:none;border-bottom:1px solid rgba(255,255,255,0.06);cursor:pointer"
        >
          <span class="font-heading text-2xl text-white/70 hover:text-white transition-colors">{{ link.label }}</span>
          <svg width="16" height="16" fill="none" stroke="#8C5331" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </button>
      </nav>

      <!-- Bottom CTA -->
      <div class="px-6 pb-10 pt-6">
        <button @click="goTo('/contactos')" class="btn-primary w-full text-center">
          Pedir Orçamento
        </button>
      </div>
    </div>
  </Transition>
</template>
