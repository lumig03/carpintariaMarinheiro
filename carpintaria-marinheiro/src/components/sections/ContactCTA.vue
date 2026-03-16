<script setup>
import { useRouter } from 'vue-router'
import LogoSaw from '@/components/ui/LogoSaw.vue'
import company from '@/data/companyData'
const router = useRouter()
</script>

<template>
  <section class="relative py-24 md:py-32 bg-brand-charcoal overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-1 bg-brand-orange" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

    <!-- Serra em marca de água animada -->
    <div class="absolute right-16 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block pointer-events-none">
      <LogoSaw :light="true" :size="260" :spinning="true" />
    </div>

    <div class="relative container-site text-center max-w-3xl mx-auto">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="w-8 h-0.5 bg-brand-orange" />
        <p class="font-sans text-xs font-semibold uppercase text-brand-orange" style="letter-spacing:0.15em">Pronto para começar?</p>
        <div class="w-8 h-0.5 bg-brand-orange" />
      </div>
      <h2 class="font-heading text-4xl md:text-5xl text-white leading-tight mb-6">
        O seu projeto começa com uma conversa
      </h2>
      <p class="font-sans text-base text-white/45 leading-relaxed mb-12">
        Diga-nos o que precisa e entraremos em contacto para perceber o seu projeto e apresentar uma solução por medida.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-14">
        <button @click="router.push('/contactos')" class="btn-primary">Pedir Orçamento Grátis</button>
        <a :href="`https://wa.me/${company.contact.whatsapp}`" target="_blank" rel="noopener noreferrer"
          class="btn-outline-light inline-flex items-center gap-2">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
      </div>

      <div class="flex flex-wrap justify-center gap-8 pt-10" style="border-top:1px solid rgba(255,255,255,0.1)">
        <div class="flex items-center gap-2">
          <svg width="15" height="15" fill="none" stroke="#8C5331" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="font-sans text-xs text-white/35">Orçamento sem compromisso</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="15" height="15" fill="none" stroke="#8C5331" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
          <span class="font-sans text-xs text-white/35">Ponte de Lima e região</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="15" height="15" fill="none" stroke="#8C5331" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="font-sans text-xs text-white/35">Resposta rápida</span>
        </div>
      </div>
    </div>
  </section>
</template>
