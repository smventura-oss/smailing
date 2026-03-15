import { ref, onMounted, onUnmounted } from 'vue'

export function useShrinkHeader(threshold = 30) {
  const shrunk = ref(false)
  let ticking = false

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const y = window.scrollY || window.pageYOffset
      if (!shrunk.value && y > threshold) shrunk.value = true
      else if (shrunk.value && y < threshold * 0.4) shrunk.value = false
      ticking = false
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { shrunk }
}
