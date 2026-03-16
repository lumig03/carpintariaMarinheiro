<script setup>
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutPreview from '@/components/sections/AboutPreview.vue'
import ServicesGrid from '@/components/sections/ServicesGrid.vue'
import InstagramFeed from '@/components/sections/InstagramFeed.vue'
import ContactCTA from '@/components/sections/ContactCTA.vue'

const advantages = [
  { title: 'Soluções por Medida',      desc: 'Cada móvel concebido especificamente para o seu espaço, sem compromissos de série.' },
  { title: 'Acabamentos de Qualidade', desc: 'Materiais e processos que garantem durabilidade e resultado impecável.' },
  { title: 'Design Funcional',         desc: 'Estética contemporânea aliada a soluções práticas para o quotidiano.' },
  { title: 'Montagem Profissional',    desc: 'Equipa especializada que garante a instalação perfeita de cada projeto.' },
]
const testimonials = [
  { text: 'A cozinha ficou exatamente como imaginei, muito melhor até. Profissionalismo e qualidade a todos os níveis.', author: 'Ana M.',   location: 'Ponte de Lima' },
  { text: 'Recomendo sem hesitar. Os roupeiros estão perfeitos, bem acabados e aproveitam todo o espaço disponível.',   author: 'João F.',  location: 'Viana do Castelo' },
  { text: 'Desde o projeto ao acabamento, tudo correu na perfeição. Empresa séria, de confiança e com muito bom gosto.', author: 'Carla S.', location: 'Barcelos' },
]
</script>

<template>
  <div>
    <HeroSection />

    <!-- Advantages strip -->
    <section class="bg-brand-dark py-14 border-t border-brand-orange/20">
      <div class="container-site">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="adv in advantages" :key="adv.title" class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <!-- Orange triangle like logo decorations -->
              <svg width="10" height="10" viewBox="0 0 10 10" class="flex-shrink-0">
                <polygon points="0,10 5,0 10,10" fill="#C4521A"/>
              </svg>
            </div>
            <h3 class="font-heading text-base text-white">{{ adv.title }}</h3>
            <p class="font-sans text-xs text-white/40 leading-relaxed">{{ adv.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <AboutPreview />
    <ServicesGrid :preview="true" />
    <InstagramFeed :limit="6" />

    <!-- Testimonials -->
    <section class="py-24 md:py-32 bg-brand-beige/30">
      <div class="container-site">
        <div class="text-center mb-16">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-8 h-0.5 bg-brand-orange"/>
            <span class="font-sans text-xs font-semibold tracking-brand uppercase text-brand-orange">Depoimentos</span>
            <div class="w-8 h-0.5 bg-brand-orange"/>
          </div>
          <h2 class="font-heading text-4xl md:text-5xl text-brand-charcoal">O que dizem os nossos clientes</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="t in testimonials" :key="t.author"
            class="bg-white p-10 relative border-t-2 border-brand-orange hover:shadow-lg transition-shadow duration-300">
            <div class="absolute -top-3 left-8 font-heading text-6xl text-brand-orange/20 leading-none select-none">&ldquo;</div>
            <p class="font-sans text-sm text-brand-gray leading-relaxed mb-8 pt-4">{{ t.text }}</p>
            <div class="flex items-center gap-3 pt-6 border-t border-brand-sand">
              <div class="w-8 h-8 bg-brand-orange/15 flex items-center justify-center font-heading text-sm text-brand-orange font-bold">
                {{ t.author[0] }}
              </div>
              <div>
                <p class="font-sans text-sm font-medium text-brand-charcoal">{{ t.author }}</p>
                <p class="font-sans text-xs text-brand-gray">{{ t.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
