<script setup>
defineProps({
  hover: { type: Boolean, default: true },
  padded: { type: Boolean, default: true },
})
</script>

<template>
  <div
    :class="[
      'bg-brand-offwhite',
      hover && 'card-hover',
      padded && 'p-8',
    ]"
  >
    <slot />
  </div>
</template>
