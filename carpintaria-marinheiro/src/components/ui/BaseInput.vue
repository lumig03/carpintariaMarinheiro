<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  error: String,
  required: Boolean,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative">
    <label v-if="label" class="form-label">
      {{ label }}<span v-if="required" class="text-brand-orange ml-0.5">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :class="['input-field', error && 'error']"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="mt-1.5 text-xs text-red-500 font-body">{{ error }}</p>
  </div>
</template>
