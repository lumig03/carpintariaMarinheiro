<script setup>
import company from '@/data/companyData'
defineProps({ preview: { type: Boolean, default: false } })
const services = company.services.slice(0, 6)
const serviceImages = {
  cozinhas: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  roupeiros: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
  'casas-banho': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
  quartos: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
  armarios: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'moveis-tv': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  personalizado: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80',
  montagem: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
}
</script>

<template>
  <section class="py-24 md:py-32 bg-brand-beige/40">
    <div class="container-site">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-0.5 bg-brand-orange" />
            <span class="font-sans text-xs font-semibold tracking-brand uppercase text-brand-orange">Os Nossos Serviços</span>
          </div>
          <h2 class="font-heading text-4xl md:text-5xl text-brand-charcoal leading-tight">
            Soluções em Madeira<br>
            <span class="italic text-brand-orange">para Cada Divisão</span>
          </h2>
        </div>
        <RouterLink v-if="preview" to="/servicos" class="btn-ghost hidden md:inline-flex items-center gap-2 mb-2">
          Ver todos os serviços
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="service in services" :key="service.id"
          class="group relative overflow-hidden bg-white card-lift">
          <div class="aspect-[4/3] overflow-hidden relative">
            <img :src="serviceImages[service.id]" :alt="service.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/>
            <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"/>
          </div>
          <div class="p-7">
            <div class="w-6 h-0.5 bg-brand-orange mb-4 transition-all duration-300 group-hover:w-10"/>
            <h3 class="font-heading text-xl text-brand-charcoal mb-3">{{ service.title }}</h3>
            <p class="font-sans text-sm text-brand-gray leading-relaxed mb-6">{{ service.description }}</p>
            <RouterLink to="/contactos"
              class="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-brand uppercase text-brand-orange hover:text-brand-orange-dark transition-colors group/link">
              Pedir Orçamento
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                class="transition-transform duration-300 group-hover/link:translate-x-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-if="preview" class="mt-10 text-center md:hidden">
        <RouterLink to="/servicos" class="btn-outline">Ver todos os serviços</RouterLink>
      </div>
    </div>
  </section>
</template>
