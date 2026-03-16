<script setup>
defineProps({
  label: String,
  title: String,
  subtitle: String,
  center: { type: Boolean, default: false },
  light: { type: Boolean, default: false },
})
</script>

<template>
  <div :class="['mb-12 md:mb-16', center && 'text-center']">
    <div v-if="label" :class="['flex items-center gap-3 mb-4', center && 'justify-center']">
      <div class="w-8 h-0.5 bg-brand-orange flex-shrink-0" />
      <p class="font-sans text-xs font-semibold tracking-brand uppercase text-brand-orange">{{ label }}</p>
    </div>
    <h2 :class="[
      'font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-4',
      light ? 'text-white' : 'text-brand-charcoal',
    ]">
      <slot>{{ title }}</slot>
    </h2>
    <p v-if="subtitle" :class="[
      'font-sans text-base leading-relaxed max-w-2xl',
      light ? 'text-white/50' : 'text-brand-gray',
      center && 'mx-auto'
    ]">{{ subtitle }}</p>
  </div>
</template>
