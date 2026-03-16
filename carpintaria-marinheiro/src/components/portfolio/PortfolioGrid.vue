<script setup>
import { ref, computed, onMounted } from 'vue'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import Modal from '@/components/ui/Modal.vue'
import { fetchInstagramFeed, filterByCategory, formatCaption } from '@/services/instagramService'
import { portfolioCategories } from '@/data/portfolioFallback'
import company from '@/data/companyData'

const props = defineProps({
  limit: { type: Number, default: 12 },
})

const posts = ref([])
const loading = ref(true)
const activeCategory = ref('Todos')
const selected = ref(null)
const lightboxOpen = ref(false)
const selectedIndex = ref(0)

onMounted(async () => {
  const result = await fetchInstagramFeed(props.limit)
  posts.value = result.data
  loading.value = false
})

const filteredPosts = computed(() => filterByCategory(posts.value, activeCategory.value))

function openLightbox(post, index) {
  selected.value = post
  selectedIndex.value = index
  lightboxOpen.value = true
}

function navigate(dir) {
  const list = filteredPosts.value
  const next = (selectedIndex.value + dir + list.length) % list.length
  selectedIndex.value = next
  selected.value = list[next]
}
</script>

<template>
  <div>
    <!-- Category filter -->
    <div class="flex flex-wrap gap-2 md:gap-3 mb-10">
      <button v-for="cat in portfolioCategories"
        :key="cat"
        @click="activeCategory = cat"
        :class="[
          'px-5 py-2.5 font-body text-xs font-medium tracking-widest uppercase transition-all duration-300',
          activeCategory === cat
            ? 'bg-brand-dark text-white'
            : 'bg-brand-beige text-brand-charcoal/60 hover:bg-sand hover:text-brand-charcoal'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Loading -->
    <LoadingSkeleton v-if="loading" :count="props.limit" />

    <!-- Grid -->
    <TransitionGroup
      v-else
      name="portfolio-grid"
      tag="div"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
    >
      <div
        v-for="(post, i) in filteredPosts"
        :key="post.id"
        class="group relative aspect-square overflow-hidden cursor-pointer"
        @click="openLightbox(post, i)"
      >
        <img
          :src="post.thumbnail_url || post.media_url"
          :alt="formatCaption(post.caption)"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <p v-if="post.category" class="text-xs text-brand-orange font-body tracking-widest uppercase mb-1">{{ post.category }}</p>
            <p class="text-xs text-white/80 font-body line-clamp-2">{{ formatCaption(post.caption) }}</p>
          </div>
        </div>
        <!-- Expand icon -->
        <div class="absolute top-3 right-3 w-8 h-8 bg-brand-offwhite/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
          </svg>
        </div>
      </div>
    </TransitionGroup>

    <!-- Empty state -->
    <div v-if="!loading && filteredPosts.length === 0" class="py-20 text-center">
      <p class="font-body text-brand-charcoal/40">Nenhum projeto encontrado nesta categoria.</p>
    </div>

    <!-- Lightbox -->
    <Modal :open="lightboxOpen" @close="lightboxOpen = false">
      <div
        v-if="selected"
        class="relative max-w-6xl w-full mx-4 bg-brand-dark overflow-hidden"
        @click.stop
      >
        <div class="flex flex-col md:flex-row">
          <!-- Image with nav -->
          <div class="flex-1 relative min-h-72">
            <img
              :src="selected.media_url"
              :alt="formatCaption(selected.caption)"
              class="w-full h-full object-cover max-h-[70vh] md:max-h-[85vh]"
            />
            <!-- Prev/Next -->
            <button @click="navigate(-1)"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark/60 flex items-center justify-center text-white hover:bg-brand-dark transition-colors"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
              </svg>
            </button>
            <button @click="navigate(1)"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark/60 flex items-center justify-center text-white hover:bg-brand-dark transition-colors"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
              </svg>
            </button>
            <!-- Counter -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-dark/60 px-3 py-1 text-white/70 text-xs font-body">
              {{ selectedIndex + 1 }} / {{ filteredPosts.length }}
            </div>
          </div>

          <!-- Info -->
          <div class="w-full md:w-80 p-8 flex flex-col justify-between">
            <div>
              <p v-if="selected.category" class="section-label text-brand-orange mb-4">{{ selected.category }}</p>
              <p class="font-body text-sm text-white/70 leading-relaxed">
                {{ formatCaption(selected.caption) }}
              </p>
            </div>
            <div class="mt-8 flex flex-col gap-3">
              <a
                :href="selected.permalink"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline-light text-xs text-center"
              >
                Ver no Instagram
              </a>
              <button @click="$router.push('/contactos')" class="btn-primary text-xs text-center"
                @click="lightboxOpen = false"
              >
                Pedir Orçamento Similar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.portfolio-grid-enter-active,
.portfolio-grid-leave-active {
  transition: all 0.4s ease;
}
.portfolio-grid-enter-from,
.portfolio-grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.portfolio-grid-move {
  transition: transform 0.4s ease;
}
</style>
