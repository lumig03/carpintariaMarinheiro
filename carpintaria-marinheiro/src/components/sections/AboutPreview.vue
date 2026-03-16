<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
</script>

<template>
  <section class="py-24 md:py-32 bg-brand-offwhite">
    <div class="container-site grid md:grid-cols-2 gap-16 md:gap-24 items-center">
      <!-- Image -->
      <div class="relative">
        <div class="aspect-[4/5] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85"
            alt="Atelier Carpintaria Marinheiro"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy"/>
        </div>
        <div class="absolute -bottom-5 -right-5 w-28 h-28 border border-brand-orange/25 -z-10 hidden md:block"/>
        <div class="absolute -top-5 -left-5 w-16 h-16 bg-brand-beige -z-10 hidden md:block"/>
        <!-- Badge -->
        <div class="absolute bottom-8 left-8 bg-brand-charcoal text-white p-5">
          <p class="font-heading text-3xl text-brand-orange">+10</p>
          <p class="font-sans text-xs tracking-brand uppercase text-white/45 mt-1">Anos de Experiência</p>
        </div>
      </div>

      <!-- Text -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-0.5 bg-brand-orange" />
          <span class="font-sans text-xs font-semibold tracking-brand uppercase text-brand-orange">Quem Somos</span>
        </div>
        <h2 class="font-heading text-4xl md:text-5xl text-brand-charcoal leading-tight mb-8">
          Carpintaria com Alma,<br>
          <span class="italic text-brand-orange">Mobiliário com Identidade</span>
        </h2>
        <div class="space-y-4 font-sans text-brand-gray leading-relaxed mb-10">
          <p>A Carpintaria Marinheiro nasceu da paixão pela madeira e pelo artesanato de qualidade. Ao longo dos anos, crescemos para nos tornar uma referência regional em mobiliário por medida para interiores residenciais.</p>
          <p>Cada projeto é único. Trabalhamos lado a lado com os nossos clientes, do primeiro esboço à entrega final, garantindo que cada móvel responde às suas necessidades e valoriza o seu espaço.</p>
        </div>
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 mb-10 pt-8 border-t border-brand-sand">
          <div>
            <p class="font-heading text-3xl text-brand-charcoal">+200</p>
            <p class="font-sans text-xs text-brand-gray mt-1">Projetos concluídos</p>
          </div>
          <div>
            <p class="font-heading text-3xl text-brand-charcoal">+10</p>
            <p class="font-sans text-xs text-brand-gray mt-1">Anos de experiência</p>
          </div>
          <div>
            <p class="font-heading text-3xl text-brand-charcoal">100%</p>
            <p class="font-sans text-xs text-brand-gray mt-1">Por medida</p>
          </div>
        </div>
        <RouterLink to="/sobre" class="btn-outline">Conhecer a Empresa</RouterLink>
      </div>
    </div>
  </section>
</template>
