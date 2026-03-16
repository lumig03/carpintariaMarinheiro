<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  rows: { type: Number, default: 4 },
  error: String,
  required: Boolean,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label v-if="label" class="form-label">
      {{ label }}<span v-if="required" class="text-brand-orange ml-0.5">*</span>
    </label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :required="required"
      :class="['input-field resize-none', error && 'error']"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="mt-1.5 text-xs text-red-500 font-body">{{ error }}</p>
  </div>
</template>
