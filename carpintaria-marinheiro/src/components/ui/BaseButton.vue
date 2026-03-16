<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | outline-light | ghost
  tag: { type: String, default: 'button' },
  type: { type: String, default: 'button' },
  disabled: Boolean,
  loading: Boolean,
})
</script>

<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :disabled="disabled || loading"
    :class="[
      variant === 'primary' && 'btn-primary',
      variant === 'secondary' && 'btn-outline',
      variant === 'outline-light' && 'btn-outline-light',
      variant === 'ghost' && 'inline-flex items-center gap-2 font-body text-sm font-medium text-brand-orange hover:text-brand-orange-dark underline-offset-4 hover:underline transition-colors',
      (disabled || loading) && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <span v-if="loading" class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    <slot />
  </component>
</template>
