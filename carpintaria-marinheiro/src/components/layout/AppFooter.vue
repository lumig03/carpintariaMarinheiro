<script setup>
import company from '@/data/companyData'
const year = new Date().getFullYear()
const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Sobre Nós', to: '/sobre' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Contactos', to: '/contactos' },
]
</script>

<template>
  <footer class="bg-brand-dark text-white">
    <!-- Orange top accent -->
    <div class="h-1 bg-brand-orange" />

    <div class="container-site py-16 md:py-20 grid md:grid-cols-3 gap-12 md:gap-8">

      <!-- Brand column -->
      <div>
        <RouterLink to="/" class="flex items-center gap-3 mb-6 group">
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" class="flex-shrink-0">
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
            <span class="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-white/70">CARPINTARIA</span>
            <span class="font-heading font-bold text-xl text-brand-orange">MARINHEIRO</span>
          </div>
        </RouterLink>

        <p class="font-sans text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
          Mobiliário por medida com design, rigor e acabamento profissional. Ponte de Lima.
        </p>
        <a :href="company.social.instagram" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-white/35 hover:text-brand-orange transition-colors text-sm">
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          {{ company.social.instagramHandle }}
        </a>
      </div>

      <!-- Navigation -->
      <div>
        <p class="font-sans text-xs tracking-brand uppercase text-white/25 mb-6">Navegação</p>
        <nav class="flex flex-col gap-3">
          <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
            class="font-sans text-sm text-white/45 hover:text-brand-orange transition-colors">
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>

      <!-- Contact -->
      <div>
        <p class="font-sans text-xs tracking-brand uppercase text-white/25 mb-6">Contacto</p>
        <address class="not-italic space-y-3">
          <p class="font-sans text-sm text-white/45 leading-relaxed">
            {{ company.address.street }}<br>
            {{ company.address.locality }}<br>
            {{ company.address.city }} {{ company.address.postalCode }}
          </p>
          <a :href="`tel:${company.contact.phone}`"
            class="block font-sans text-sm text-white/45 hover:text-brand-orange transition-colors">
            {{ company.contact.phoneDisplay }}
          </a>
          <a :href="`mailto:${company.contact.email}`"
            class="block font-sans text-sm text-white/45 hover:text-brand-orange transition-colors break-all">
            {{ company.contact.email }}
          </a>
        </address>
        <div class="mt-6">
          <p class="font-sans text-xs tracking-brand uppercase text-white/25 mb-3">Horário</p>
          <div v-for="h in company.hours" :key="h.days" class="flex justify-between font-sans text-xs py-1.5 border-b border-white/5 last:border-0">
            <span class="text-white/35">{{ h.days }}</span>
            <span :class="h.hours === 'Encerrado' ? 'text-white/20' : 'text-white/55'">{{ h.hours }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-white/8">
      <div class="container-site py-5 flex flex-col md:flex-row justify-between gap-2 font-sans text-xs text-white/20">
        <p>© {{ year }} Carpintaria Marinheiro. Todos os direitos reservados.</p>
        <p>Ponte de Lima, Portugal</p>
      </div>
    </div>
  </footer>
</template>
