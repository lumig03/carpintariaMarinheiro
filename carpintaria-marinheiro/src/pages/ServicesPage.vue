<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ContactCTA from '@/components/sections/ContactCTA.vue'
import company from '@/data/companyData'

const serviceImages = {
  cozinhas: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  roupeiros: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  'casas-banho': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  quartos: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
  armarios: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'moveis-tv': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  personalizado: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
  montagem: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
}
</script>

<template>
  <div class="pt-28">
    <!-- Hero -->
    <section class="py-20 md:py-28 bg-brand-beige/30">
      <div class="container-site max-w-3xl">
        <p class="section-label">Serviços</p>
        <h1 class="font-heading text-5xl md:text-6xl text-brand-charcoal leading-tight mb-6">
          Soluções Completas em <em class="italic text-brand-orange">Madeira e Interiores</em>
        </h1>
        <p class="font-body text-lg text-brand-charcoal/60 leading-relaxed">
          Do design à instalação, criamos mobiliário por medida para todas as divisões da sua casa. Cada projeto é único, pensado exclusivamente para o seu espaço e estilo de vida.
        </p>
      </div>
    </section>

    <!-- Services grid -->
    <section class="py-24 md:py-32 bg-brand-offwhite">
      <div class="container-site">
        <div class="space-y-24">
          <div
            v-for="(service, i) in company.services"
            :key="service.id"
            :class="['grid md:grid-cols-2 gap-12 md:gap-20 items-center', i % 2 !== 0 && 'md:[&>*:first-child]:order-2']"
          >
            <!-- Image -->
            <div class="relative overflow-hidden group">
              <div class="aspect-[4/3]">
                <img
                  :src="serviceImages[service.id]"
                  :alt="service.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <!-- Category badge -->
              <div class="absolute top-6 left-6 bg-brand-charcoal/80 text-white px-4 py-2">
                <span class="font-body text-xs tracking-widest uppercase">{{ service.category }}</span>
              </div>
            </div>

            <!-- Content -->
            <div>
              <p class="section-label">{{ service.category }}</p>
              <h2 class="font-heading text-3xl md:text-4xl text-brand-charcoal mb-6">{{ service.title }}</h2>
              <p class="font-body text-brand-charcoal/60 leading-relaxed mb-8 text-lg">{{ service.description }}</p>
              <ul class="space-y-3 mb-10">
                <li class="flex items-start gap-3 font-body text-sm text-brand-charcoal/60">
                  <svg class="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                  Projeto personalizado e exclusivo
                </li>
                <li class="flex items-start gap-3 font-body text-sm text-brand-charcoal/60">
                  <svg class="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                  Materiais de qualidade certificada
                </li>
                <li class="flex items-start gap-3 font-body text-sm text-brand-charcoal/60">
                  <svg class="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                  Montagem e instalação incluída
                </li>
              </ul>
              <button @click="$router.push('/contactos')" class="btn-primary">
                Pedir Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
