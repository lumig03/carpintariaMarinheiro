<script setup>
defineProps({ count: { type: Number, default: 6 }, aspect: { type: String, default: 'square' } })
</script>
<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="i in count" :key="i"
      :class="['skeleton rounded-none', aspect === 'portrait' ? 'aspect-portrait' : 'aspect-square']" />
  </div>
</template>
