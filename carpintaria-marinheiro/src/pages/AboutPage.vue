<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ContactCTA from '@/components/sections/ContactCTA.vue'
import company from '@/data/companyData'

const values = [
  {
    title: 'Personalização Total',
    description: 'Cada projeto parte das necessidades reais do cliente. Não existem soluções pré-definidas — cada móvel é desenhado, dimensionado e acabado exclusivamente para o seu espaço.',
  },
  {
    title: 'Rigor de Execução',
    description: 'Da medição ao acabamento final, cada etapa é executada com precisão e cuidado. O detalhe faz a diferença, e nós sabemos disso.',
  },
  {
    title: 'Materiais de Qualidade',
    description: 'Selecionamos criteriosamente os materiais que utilizamos — placas, ferragens, lacas e acabamentos de fornecedores certificados que garantem durabilidade e beleza ao longo do tempo.',
  },
  {
    title: 'Relação de Proximidade',
    description: 'Acompanhamos o cliente em todas as fases do projeto. Comunicação clara, prazos cumpridos e resultado final à altura das expectativas.',
  },
]

const process = [
  { step: '01', title: 'Contacto Inicial', description: 'Conta-nos o seu projeto, enviamos uma proposta e marcamos uma visita ao espaço.' },
  { step: '02', title: 'Visita e Medições', description: 'Deslocamo-nos ao local para medições rigorosas e para perceber melhor as suas necessidades.' },
  { step: '03', title: 'Proposta e Orçamento', description: 'Apresentamos a proposta detalhada com materiais, acabamentos e preço final sem surpresas.' },
  { step: '04', title: 'Produção', description: 'Iniciamos a produção em atelier com os materiais acordados, com controlo de qualidade em cada fase.' },
  { step: '05', title: 'Montagem', description: 'A nossa equipa instala o mobiliário no local com cuidado e profissionalismo.' },
  { step: '06', title: 'Entrega Final', description: 'Entregamos o projeto concluído, garantindo que tudo está perfeito antes de finalizar o trabalho.' },
]
</script>

<template>
  <div class="pt-28">
    <!-- Page hero -->
    <section class="py-20 md:py-28 bg-brand-beige/30">
      <div class="container-site">
        <div class="max-w-3xl">
          <p class="section-label">Sobre Nós</p>
          <h1 class="font-heading text-5xl md:text-6xl text-brand-charcoal leading-tight mb-6">
            Uma Carpintaria Moderna ao Serviço do <em class="italic text-brand-orange">Design de Interiores</em>
          </h1>
          <p class="font-body text-lg text-brand-charcoal/60 leading-relaxed">
            Somos uma equipa apaixonada pela madeira, pelo design e pela qualidade de execução. Com anos de experiência em mobiliário por medida, tornámo-nos uma referência regional para quem quer interiores com personalidade e acabamento profissional.
          </p>
        </div>
      </div>
    </section>

    <!-- Story + Image -->
    <section class="py-24 md:py-32 bg-brand-offwhite">
      <div class="container-site grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <SectionTitle label="A Nossa História" title="Nascidos da Paixão pela Madeira" />
          <div class="space-y-5 font-body text-brand-charcoal/70 leading-relaxed">
            <p>
              A Carpintaria Marinheiro tem as suas raízes em Ponte de Lima, no coração do Minho. Começámos com um pequeno atelier e uma grande ambição: criar mobiliário que durasse gerações e que fizesse cada casa sentir-se única.
            </p>
            <p>
              Ao longo dos anos, crescemos e evoluímos. Investimos em equipamentos, em formação e em design — sem nunca perder o que nos define: o trabalho artesanal, a atenção ao detalhe e o compromisso com cada cliente.
            </p>
            <p>
              Hoje, os nossos projetos chegam a toda a região do Minho. Cozinhas, roupeiros, casas de banho, quartos, salas — cada divisão é uma oportunidade de criar algo especial, funcional e duradouro.
            </p>
            <p>
              Cada projeto é pensado para responder às necessidades do cliente, valorizando o espaço com soluções modernas, funcionais e duradouras.
            </p>
          </div>
        </div>
        <div class="relative">
          <div class="aspect-[3/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=85"
              alt="Atelier Carpintaria Marinheiro"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="absolute -bottom-6 -left-6 bg-brand-orange p-8 hidden md:block">
            <p class="font-heading text-4xl text-white">+200</p>
            <p class="font-body text-xs text-white/70 tracking-widest uppercase mt-1">Projetos Concluídos</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-24 md:py-32 bg-brand-charcoal">
      <div class="container-site">
        <SectionTitle
          label="Os Nossos Valores"
          title="O que nos define em cada projeto"
          :light="true"
          :center="true"
        />
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <div
            v-for="value in values"
            :key="value.title"
            class="border border-offwhite/10 p-8 hover:border-wood/40 transition-colors duration-300"
          >
            <h3 class="font-heading text-xl text-white mb-4">{{ value.title }}</h3>
            <p class="font-body text-sm text-white/50 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="py-24 md:py-32 bg-brand-offwhite">
      <div class="container-site">
        <SectionTitle
          label="Como Trabalhamos"
          title="Do Primeiro Contacto à Entrega Final"
          subtitle="Um processo simples, transparente e orientado ao resultado."
        />
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="step in process"
            :key="step.step"
            class="relative pl-0"
          >
            <p class="font-heading text-5xl text-brand-orange/15 mb-4 leading-none">{{ step.step }}</p>
            <h3 class="font-heading text-xl text-brand-charcoal mb-3">{{ step.title }}</h3>
            <p class="font-body text-sm text-brand-charcoal/60 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Areas -->
    <section class="py-16 bg-brand-beige/30">
      <div class="container-site">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p class="section-label">Zonas de Atuação</p>
            <h2 class="font-heading text-3xl text-brand-charcoal">Servimos toda a região do Minho</h2>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="area in company.areas"
              :key="area"
              class="px-4 py-2 bg-brand-offwhite font-body text-sm text-brand-charcoal/60 border border-brand-charcoal/10"
            >
              {{ area }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
