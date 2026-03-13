import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ITEMS, NEEDS_BUYING } from '@/data/despensa'

const STORAGE_KEY = 'smailing-pantry-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch { /* ignore */ }
}

export const useDespensaStore = defineStore('despensa', () => {
  const state = ref({})

  function init() {
    const saved = load()
    const result = {}
    for (const item of ITEMS) {
      result[item.id] = saved[item.id] ?? {
        inDesp: !NEEDS_BUYING.has(item.id),
        bought: false,
      }
    }
    state.value = result
  }

  function persist() {
    save(state.value)
  }

  function moveToCompra(id) {
    if (!state.value[id]) return
    state.value[id] = { inDesp: false, bought: false }
    persist()
  }

  function toggleBought(id) {
    if (!state.value[id]) return
    const cur = state.value[id]
    state.value[id] = { ...cur, bought: !cur.bought }
    if (state.value[id].bought) {
      setTimeout(() => {
        if (state.value[id]?.bought) {
          state.value[id] = { inDesp: true, bought: false }
          persist()
        }
      }, 700)
    }
    persist()
  }

  function markAllBought() {
    for (const item of ITEMS) {
      state.value[item.id] = { inDesp: true, bought: false }
    }
    persist()
  }

  const inDesp = computed(() => ITEMS.filter(i => state.value[i.id]?.inDesp))
  const inCompra = computed(() => ITEMS.filter(i => state.value[i.id] && !state.value[i.id].inDesp))

  function isBought(id) {
    return !!state.value[id]?.bought
  }

  init()

  return { state, inDesp, inCompra, moveToCompra, toggleBought, markAllBought, isBought }
})
