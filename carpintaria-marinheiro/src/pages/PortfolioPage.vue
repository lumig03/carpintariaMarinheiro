<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProjects'
import { categories } from '@/data/projectsData'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ContactCTA from '@/components/sections/ContactCTA.vue'

const router = useRouter()
const { allProjects, byCategory } = useProjects()

const activeCategory = ref('Todos')
const lightbox = ref(null)
const lightboxIndex = ref(0)

const filtered = byCategory(activeCategory)

function openLightbox(project) {
  lightbox.value = project
  lightboxIndex.value = filtered.value.findIndex(p => p.id === project.id)
}
function closeLightbox() { lightbox.value = null }

function navigate(dir) {
  const list = filtered.value
  const next = (lightboxIndex.value + dir + list.length) % list.length
  lightboxIndex.value = next
  lightbox.value = list[next]
}

import { onMounted, onUnmounted } from 'vue'
function onKey(e) {
  if (!lightbox.value) return
  if (e.key === 'Escape')     closeLightbox()
  if (e.key === 'ArrowRight') navigate(1)
  if (e.key === 'ArrowLeft')  navigate(-1)
}
onMounted(()   => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="pt-28">
    <!-- Page hero -->
    <section class="py-20 md:py-24 bg-brand-beige/30">
      <div class="container-site flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-0.5 bg-brand-orange"/>
            <span class="font-sans text-xs font-semibold uppercase text-brand-orange" style="letter-spacing:0.15em">Portefólio</span>
          </div>
          <h1 class="font-heading text-5xl md:text-6xl text-brand-charcoal leading-tight mb-4">
            Projetos que <span class="italic text-brand-orange">falam por si</span>
          </h1>
          <p class="font-sans text-lg text-brand-gray leading-relaxed">
            Cada obra é o resultado de dedicação e atenção ao detalhe. Explore os nossos projetos.
          </p>
        </div>
        <button
          @click="router.push('/admin')"
          class="self-start md:self-auto inline-flex items-center gap-2 font-sans text-xs uppercase text-brand-charcoal/40 hover:text-brand-orange transition-colors"
          style="background:none;border:none;cursor:pointer;padding:0;letter-spacing:0.15em"
          title="Área de administração"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Gerir projetos
        </button>
      </div>
    </section>

    <!-- Filter + Grid -->
    <section class="py-16 md:py-24 bg-brand-offwhite">
      <div class="container-site">

        <!-- Category filters -->
        <div class="flex flex-wrap gap-2 mb-10">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            class="px-5 py-2.5 font-sans text-xs font-medium transition-all duration-200"
            style="border:none;cursor:pointer;letter-spacing:0.1em"
            :style="activeCategory === cat
              ? 'background:#2D2D2D;color:white'
              : 'background:#EAE6DF;color:rgba(45,45,45,0.6)'"
          >
            {{ cat }}
            <span v-if="cat !== 'Todos'" class="ml-1 opacity-50 text-xs">
              ({{ allProjects.filter(p => p.category === cat).length }})
            </span>
          </button>
        </div>

        <!-- Grid -->
        <TransitionGroup
          name="grid-fade"
          tag="div"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <div
            v-for="(project, i) in filtered"
            :key="project.id"
            class="group relative aspect-square overflow-hidden cursor-pointer"
            @click="openLightbox(project)"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
              <span class="font-sans text-xs uppercase text-brand-orange mb-1" style="letter-spacing:0.12em">{{ project.category }}</span>
              <p class="font-heading text-white text-base leading-tight">{{ project.title }}</p>
            </div>
            <!-- Featured badge -->
            <div v-if="project.featured"
              class="absolute top-3 left-3 bg-brand-orange px-2 py-0.5 font-sans text-xs text-white"
              style="letter-spacing:0.1em">
              Destaque
            </div>
          </div>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-if="filtered.length === 0" class="py-20 text-center">
          <p class="font-sans text-brand-gray">Nenhum projeto encontrado nesta categoria.</p>
        </div>
      </div>
    </section>

    <ContactCTA />

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightbox"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style="backdrop-filter:blur(16px);background:rgba(26,26,26,0.92)"
          @click.self="closeLightbox"
        >
          <button @click="closeLightbox" class="absolute top-5 right-5 text-white/60 hover:text-white transition-colors" style="background:none;border:none;cursor:pointer">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="flex flex-col md:flex-row bg-brand-dark max-w-5xl w-full overflow-hidden" @click.stop>
            <!-- Image + nav -->
            <div class="flex-1 relative min-h-64">
              <img :src="lightbox.image" :alt="lightbox.title" class="w-full h-full object-cover max-h-[65vh] md:max-h-none" />
              <button @click="navigate(-1)" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors" style="background:none;border:none;cursor:pointer;background:rgba(0,0,0,0.5)">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
              </button>
              <button @click="navigate(1)" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors" style="background:none;border:none;cursor:pointer;background:rgba(0,0,0,0.5)">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
              </button>
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 text-white/70 text-xs font-sans">
                {{ lightboxIndex + 1 }} / {{ filtered.length }}
              </div>
            </div>
            <!-- Info -->
            <div class="w-full md:w-72 p-8 flex flex-col justify-between">
              <div>
                <span class="font-sans text-xs uppercase text-brand-orange mb-3 block" style="letter-spacing:0.15em">{{ lightbox.category }}</span>
                <h3 class="font-heading text-2xl text-white mb-4">{{ lightbox.title }}</h3>
                <p class="font-sans text-sm text-white/55 leading-relaxed">{{ lightbox.description }}</p>
              </div>
              <div class="mt-8">
                <button @click="router.push('/contactos'); closeLightbox()" class="btn-primary w-full text-xs">
                  Pedir Projeto Similar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.grid-fade-enter-active, .grid-fade-leave-active { transition: all 0.3s ease; }
.grid-fade-enter-from, .grid-fade-leave-to { opacity: 0; transform: scale(0.95); }
.grid-fade-move { transition: transform 0.3s ease; }
</style>
