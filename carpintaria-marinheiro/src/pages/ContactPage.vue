<script setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
import QuoteForm from '@/components/forms/QuoteForm.vue'
import company from '@/data/companyData'

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.address.full)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
</script>

<template>
  <div class="pt-28">
    <!-- Hero -->
    <section class="py-20 md:py-24 bg-brand-beige/30">
      <div class="container-site max-w-3xl">
        <p class="section-label">Contactos</p>
        <h1 class="font-heading text-5xl md:text-6xl text-brand-charcoal leading-tight mb-6">
          Vamos falar sobre <em class="italic text-brand-orange">o seu projeto</em>
        </h1>
        <p class="font-body text-lg text-brand-charcoal/60 leading-relaxed">
          Diga-nos o que precisa. Respondemos com rapidez e sem compromisso.
        </p>
      </div>
    </section>

    <!-- Contact info + Form -->
    <section class="py-24 md:py-32 bg-brand-offwhite">
      <div class="container-site grid lg:grid-cols-5 gap-16 md:gap-24">
        <!-- Left: Info -->
        <div class="lg:col-span-2 space-y-10">
          <!-- Address -->
          <div>
            <p class="section-label">Morada</p>
            <address class="not-italic font-body text-brand-charcoal/70 leading-relaxed text-base">
              {{ company.address.street }}<br>
              {{ company.address.locality }}<br>
              {{ company.address.city }} {{ company.address.postalCode }}<br>
              {{ company.address.country }}
            </address>
            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.full)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-brand-orange font-body text-sm font-medium mt-4 hover:text-brand-orange-dark transition-colors"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              Abrir no Google Maps
            </a>
          </div>

          <!-- Phone / WhatsApp / Email -->
          <div class="space-y-5">
            <p class="section-label">Contacto Direto</p>
            <a
              :href="`tel:${company.contact.phone}`"
              class="flex items-center gap-4 group"
            >
              <div class="w-12 h-12 border border-brand-charcoal/10 group-hover:border-wood flex items-center justify-center transition-colors">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="text-brand-charcoal/40 group-hover:text-brand-orange transition-colors">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                </svg>
              </div>
              <div>
                <p class="font-body text-xs tracking-widest uppercase text-brand-charcoal/40">Telefone</p>
                <p class="font-body text-brand-charcoal font-medium">{{ company.contact.phoneDisplay }}</p>
              </div>
            </a>

            <a
              :href="`https://wa.me/${company.contact.whatsapp}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 group"
            >
              <div class="w-12 h-12 border border-brand-charcoal/10 group-hover:border-wood flex items-center justify-center transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" class="text-brand-charcoal/40 group-hover:text-brand-orange transition-colors">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p class="font-body text-xs tracking-widest uppercase text-brand-charcoal/40">WhatsApp</p>
                <p class="font-body text-brand-charcoal font-medium">{{ company.contact.phoneDisplay }}</p>
              </div>
            </a>

            <a
              :href="`mailto:${company.contact.email}`"
              class="flex items-center gap-4 group"
            >
              <div class="w-12 h-12 border border-brand-charcoal/10 group-hover:border-wood flex items-center justify-center transition-colors">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="text-brand-charcoal/40 group-hover:text-brand-orange transition-colors">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                </svg>
              </div>
              <div>
                <p class="font-body text-xs tracking-widest uppercase text-brand-charcoal/40">Email</p>
                <p class="font-body text-brand-charcoal font-medium break-all text-sm">{{ company.contact.email }}</p>
              </div>
            </a>
          </div>

          <!-- Hours -->
          <div>
            <p class="section-label">Horário</p>
            <div class="space-y-2">
              <div
                v-for="h in company.hours"
                :key="h.days"
                class="flex justify-between font-body text-sm py-2 border-b border-brand-charcoal/8 last:border-0"
              >
                <span class="text-brand-charcoal/50">{{ h.days }}</span>
                <span :class="h.hours === 'Encerrado' ? 'text-brand-charcoal/30' : 'text-brand-charcoal'">{{ h.hours }}</span>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex flex-wrap gap-3">
            <a :href="`tel:${company.contact.phone}`" class="btn-outline text-xs py-3 px-5 flex items-center gap-2">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              Ligar
            </a>
            <a :href="`https://wa.me/${company.contact.whatsapp}`" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs py-3 px-5 flex items-center gap-2">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="lg:col-span-3">
          <div class="mb-12">
            <p class="section-label">Formulário de Contacto</p>
            <h2 class="font-heading text-3xl md:text-4xl text-brand-charcoal">Pedir Orçamento</h2>
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>

    <!-- Map -->
    <section class="h-96 md:h-[480px] bg-brand-beige relative overflow-hidden">
      <iframe
        :src="mapSrc"
        width="100%"
        height="100%"
        style="border:0; filter: grayscale(30%) contrast(1.1);"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Localização Carpintaria Marinheiro"
        class="absolute inset-0"
      />
      <!-- Overlay with address card -->
      <div class="absolute bottom-6 left-6 bg-brand-offwhite shadow-xl p-6 max-w-xs z-10">
        <p class="font-heading text-lg text-brand-charcoal mb-1">Carpintaria Marinheiro</p>
        <p class="font-body text-sm text-brand-charcoal/60 leading-relaxed">
          {{ company.address.street }}<br>
          {{ company.address.locality }}<br>
          {{ company.address.city }}
        </p>
        <a
          :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.full)}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-brand-orange font-body text-xs font-medium mt-3 hover:text-brand-orange-dark transition-colors"
        >
          Abrir no Google Maps
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
          </svg>
        </a>
      </div>
    </section>
  </div>
</template>
