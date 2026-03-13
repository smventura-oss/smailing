import { ref, onMounted, onUnmounted } from 'vue'

export function useShrinkHeader(threshold = 30) {
  const shrunk = ref(false)
  let ticking = false

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      shrunk.value = (window.scrollY || window.pageYOffset) > threshold
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
