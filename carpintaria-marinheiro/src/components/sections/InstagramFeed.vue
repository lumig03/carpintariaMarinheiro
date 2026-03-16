<script setup>
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import Modal from '@/components/ui/Modal.vue'
import { fetchInstagramFeed, formatCaption } from '@/services/instagramService'
import company from '@/data/companyData'

const props = defineProps({
  limit: { type: Number, default: 6 },
})

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const usingFallback = ref(false)
const selected = ref(null)
const lightboxOpen = ref(false)

onMounted(async () => {
  const result = await fetchInstagramFeed(props.limit)
  posts.value = result.data
  usingFallback.value = result.source === 'fallback'
  error.value = result.error
  loading.value = false
})

function openLightbox(post) {
  selected.value = post
  lightboxOpen.value = true
}
</script>

<template>
  <section class="py-24 md:py-32 bg-brand-offwhite">
    <div class="container-site">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <SectionTitle
          label="Trabalhos Recentes"
          title="Os Nossos Últimos Projetos"
          subtitle="Cada obra é o resultado de meses de trabalho, dedicação e atenção ao detalhe."
        />
        <a
          :href="company.social.instagram"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden md:inline-flex items-center gap-2 font-body text-sm font-medium text-brand-orange hover:text-brand-orange-dark transition-colors whitespace-nowrap mb-16"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Ver no Instagram
        </a>
      </div>

      <!-- Loading skeleton -->
      <LoadingSkeleton v-if="loading" :count="props.limit" />

      <!-- Feed grid -->
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      >
        <div
          v-for="post in posts"
          :key="post.id"
          class="group relative aspect-square overflow-hidden cursor-pointer"
          @click="openLightbox(post)"
        >
          <img
            :src="post.thumbnail_url || post.media_url"
            :alt="formatCaption(post.caption)"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3 p-4">
            <svg width="28" height="28" fill="none" stroke="white" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"/>
            </svg>
            <p v-if="post.category" class="text-xs text-white/80 font-body tracking-widest uppercase">{{ post.category }}</p>
            <p class="text-xs text-white/60 font-body text-center line-clamp-2">{{ formatCaption(post.caption) }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          :href="company.social.instagram"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline inline-flex items-center gap-3"
        >
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Ver mais no Instagram
        </a>
        <button @click="$router.push('/projetos')" class="btn-primary">
          Ver todos os projetos
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <Modal :open="lightboxOpen" @close="lightboxOpen = false">
      <div
        v-if="selected"
        class="relative max-w-5xl w-full mx-4 flex flex-col md:flex-row bg-brand-dark overflow-hidden"
        @click.stop
      >
        <!-- Image -->
        <div class="flex-1 min-h-64 md:min-h-0">
          <img
            :src="selected.media_url"
            :alt="formatCaption(selected.caption)"
            class="w-full h-full object-cover max-h-[70vh] md:max-h-none"
          />
        </div>
        <!-- Info panel -->
        <div class="w-full md:w-72 p-8 flex flex-col justify-between">
          <div>
            <p v-if="selected.category" class="section-label text-brand-orange">{{ selected.category }}</p>
            <p class="font-body text-sm text-white/70 leading-relaxed mt-3">
              {{ formatCaption(selected.caption) }}
            </p>
          </div>
          <div class="mt-8 flex flex-col gap-3">
            <a
              :href="selected.permalink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-outline-light text-xs w-full text-center"
            >
              Ver no Instagram
            </a>
            <button @click="$router.push('/contactos')" class="btn-primary text-xs w-full text-center"
              @click="lightboxOpen = false"
            >
              Pedir Orçamento Similar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </section>
</template>
