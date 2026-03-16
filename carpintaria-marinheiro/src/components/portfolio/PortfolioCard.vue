<script setup>
import { formatCaption } from '@/services/instagramService'

defineProps({
  post: { type: Object, required: true },
  index: { type: Number, default: 0 },
})
defineEmits(['open'])
</script>

<template>
  <div
    class="group relative aspect-square overflow-hidden cursor-pointer"
    @click="$emit('open', post, index)"
    role="button"
    :aria-label="`Ver projeto: ${formatCaption(post.caption)}`"
    tabindex="0"
    @keydown.enter="$emit('open', post, index)"
  >
    <!-- Image -->
    <img
      :src="post.thumbnail_url || post.media_url"
      :alt="formatCaption(post.caption)"
      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent
             opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5"
    >
      <p v-if="post.category" class="text-xs text-brand-orange font-body tracking-widest uppercase mb-1.5">
        {{ post.category }}
      </p>
      <p class="text-xs text-white/80 font-body leading-snug line-clamp-2">
        {{ formatCaption(post.caption) }}
      </p>
    </div>

    <!-- Expand icon -->
    <div
      class="absolute top-3 right-3 w-9 h-9 bg-brand-offwhite/90 backdrop-blur-sm
             flex items-center justify-center
             opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
             transition-all duration-300"
    >
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15
             M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>
    </div>
  </div>
</template>
