<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProjects'
import { categories } from '@/data/projectsData'

const router   = useRouter()
const { featuredProjects, allProjects } = useProjects()

// Lightbox
const lightbox = ref(null)

function openLightbox(project) { lightbox.value = project }
function closeLightbox()       { lightbox.value = null }

// Keyboard close
function onKey(e) { if (e.key === 'Escape') closeLightbox() }
import { onMounted, onUnmounted } from 'vue'
onMounted(()   => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section class="py-24 md:py-32 bg-brand-offwhite">
    <div class="container-site">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-0.5 bg-brand-orange" />
            <span class="font-sans text-xs font-semibold uppercase text-brand-orange" style="letter-spacing:0.15em">
              Trabalhos Recentes
            </span>
          </div>
          <h2 class="font-heading text-4xl md:text-5xl text-brand-charcoal leading-tight">
            Os Nossos Últimos <span class="italic text-brand-orange">Projetos</span>
          </h2>
        </div>
        <button
          @click="router.push('/projetos')"
          class="hidden md:inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase text-brand-orange hover:text-brand-orange-dark transition-colors self-end mb-1"
          style="background:none;border:none;cursor:pointer;padding:0;letter-spacing:0.15em"
        >
          Ver todos os projetos
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </button>
      </div>

      <!-- Grid -->
      <div v-if="featuredProjects.length" class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          class="group relative overflow-hidden cursor-pointer"
          :class="i === 0 ? 'col-span-2 md:col-span-1 row-span-1 md:row-span-2' : ''"
          :style="i === 0 ? 'aspect-ratio:1/1' : 'aspect-ratio:1/1'"
          @click="openLightbox(project)"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
            <span class="font-sans text-xs uppercase text-brand-orange mb-1" style="letter-spacing:0.15em">
              {{ project.category }}
            </span>
            <p class="font-heading text-white text-lg leading-tight">{{ project.title }}</p>
          </div>
          <!-- Expand icon -->
          <div class="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="py-20 text-center bg-brand-beige/30">
        <svg width="48" height="48" fill="none" stroke="#8C5331" stroke-width="1" viewBox="0 0 24 24" class="mx-auto mb-4 opacity-40">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
        </svg>
        <p class="font-sans text-brand-gray mb-6">Ainda não há projetos em destaque.</p>
        <button @click="router.push('/admin')" class="btn-outline text-xs">
          Adicionar Projetos
        </button>
      </div>

      <!-- Mobile CTA -->
      <div class="mt-10 text-center md:hidden">
        <button @click="router.push('/projetos')" class="btn-outline">
          Ver todos os projetos
        </button>
      </div>
    </div>

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
          style="backdrop-filter:blur(16px);background:rgba(26,26,26,0.9)"
          @click.self="closeLightbox"
        >
          <button
            @click="closeLightbox"
            class="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            style="background:none;border:none;cursor:pointer"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="flex flex-col md:flex-row bg-brand-dark max-w-5xl w-full overflow-hidden" @click.stop>
            <div class="flex-1 min-h-64">
              <img :src="lightbox.image" :alt="lightbox.title"
                class="w-full h-full object-cover max-h-[65vh] md:max-h-none" />
            </div>
            <div class="w-full md:w-72 p-8 flex flex-col justify-between">
              <div>
                <span class="font-sans text-xs uppercase text-brand-orange mb-3 block" style="letter-spacing:0.15em">
                  {{ lightbox.category }}
                </span>
                <h3 class="font-heading text-2xl text-white mb-4">{{ lightbox.title }}</h3>
                <p class="font-sans text-sm text-white/55 leading-relaxed">{{ lightbox.description }}</p>
              </div>
              <div class="mt-8">
                <button
                  @click="router.push('/contactos'); closeLightbox()"
                  class="btn-primary w-full text-center text-xs"
                >
                  Pedir Projeto Similar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
