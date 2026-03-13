import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'smailing-checklist-v1'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

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
  } catch { /* ignore quota errors */ }
}

export const useChecklistStore = defineStore('checklist', () => {
  const allState = ref(load())

  function getDayState() {
    const key = todayKey()
    if (!allState.value[key]) allState.value[key] = {}
    return allState.value[key]
  }

  function isChecked(id) {
    return !!getDayState()[id]
  }

  function toggle(id) {
    const day = getDayState()
    day[id] = !day[id]
    save(allState.value)
  }

  function reset() {
    const key = todayKey()
    allState.value[key] = {}
    save(allState.value)
  }

  return { isChecked, toggle, reset }
})
