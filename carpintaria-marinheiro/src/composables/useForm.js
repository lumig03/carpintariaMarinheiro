import { reactive, ref, computed } from 'vue'

/**
 * Generic form composable with validation.
 * @param {Object} initialValues - initial form field values
 * @param {Object} validationRules - { fieldName: (value, formValues) => errorString | null }
 */
export function useForm(initialValues, validationRules = {}) {
  const form = reactive({ ...initialValues })
  const errors = reactive({})
  const submitting = ref(false)
  const submitted = ref(false)
  const submitError = ref(null)

  const isValid = computed(() => Object.keys(errors).length === 0)

  function validateField(field) {
    const rule = validationRules[field]
    if (!rule) { delete errors[field]; return true }
    const error = rule(form[field], form)
    if (error) {
      errors[field] = error
      return false
    }
    delete errors[field]
    return true
  }

  function validateAll() {
    let allValid = true
    for (const field of Object.keys(validationRules)) {
      if (!validateField(field)) allValid = false
    }
    return allValid
  }

  function reset() {
    Object.assign(form, initialValues)
    Object.keys(errors).forEach(k => delete errors[k])
    submitted.value = false
    submitError.value = null
  }

  async function handleSubmit(submitFn) {
    if (!validateAll()) return false
    submitting.value = true
    submitError.value = null
    try {
      await submitFn({ ...form })
      submitted.value = true
      reset()
      return true
    } catch (err) {
      submitError.value = err?.message || 'Ocorreu um erro. Tente novamente.'
      return false
    } finally {
      submitting.value = false
    }
  }

  return {
    form,
    errors,
    submitting,
    submitted,
    submitError,
    isValid,
    validateField,
    validateAll,
    reset,
    handleSubmit,
  }
}
