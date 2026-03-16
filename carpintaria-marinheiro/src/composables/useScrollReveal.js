import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Reveals elements when they enter the viewport.
 * Usage:
 *   const { el, isVisible } = useScrollReveal()
 *   <div ref="el" :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'" ...>
 */
export function useScrollReveal(options = {}) {
  const el = ref(null)
  const isVisible = ref(false)

  const defaults = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
    once: true,
    ...options,
  }

  let observer

  onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (defaults.once) observer.disconnect()
      } else if (!defaults.once) {
        isVisible.value = false
      }
    }, { threshold: defaults.threshold, rootMargin: defaults.rootMargin })
    observer.observe(el.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { el, isVisible }
}
