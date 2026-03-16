<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid.vue'
import ContactCTA from '@/components/sections/ContactCTA.vue'
import company from '@/data/companyData'
</script>

<template>
  <div class="pt-28">
    <!-- Hero -->
    <section class="py-20 md:py-28 bg-brand-beige/30">
      <div class="container-site">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div class="max-w-2xl">
            <p class="section-label">Portefólio</p>
            <h1 class="font-heading text-5xl md:text-6xl text-brand-charcoal leading-tight mb-6">
              Projetos que <em class="italic text-brand-orange">falam por si</em>
            </h1>
            <p class="font-body text-lg text-brand-charcoal/60 leading-relaxed">
              Cada trabalho é o resultado de meses de planeamento, produção e dedicação. Explore os nossos projetos mais recentes.
            </p>
          </div>
          <a
            :href="company.social.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline inline-flex items-center gap-3 whitespace-nowrap self-start md:self-auto"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>

    <!-- Portfolio grid -->
    <section class="py-16 md:py-24 bg-brand-offwhite">
      <div class="container-site">
        <PortfolioGrid :limit="12" />
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
