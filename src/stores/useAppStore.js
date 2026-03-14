import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ── Static data files ────────────────────────────────────────────────────
import { WEEK_PLAN, DAY_CHIPS }                 from '@/data/nutrition'
import { RACES, PHASES, CURRENT_WEEK }          from '@/data/plan'
import { MEDIDAS_DATA, GARMIN, PESO_REGISTROS } from '@/data/medidas'
import { CATS, ITEMS, NEEDS_BUYING }            from '@/data/despensa'

// ── localStorage helpers ─────────────────────────────────────────────────
const CHECKLIST_KEY = 'smailing-checklist-v1'
const DESPENSA_KEY  = 'smailing-pantry-v1'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function lsGet(key) {
  try { return JSON.parse(localStorage.getItem(key) ?? '{}') } catch { return {} }
}

function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch { /* quota */ }
}

// ── Store ────────────────────────────────────────────────────────────────
export const useAppStore = defineStore('app', () => {

  // ════════════════════════════════════════════════════════════════════════
  // DATOS ESTÁTICOS (read-only, importados de /data)
  // ════════════════════════════════════════════════════════════════════════

  // Nutrición — plan semanal
  const weekPlan    = WEEK_PLAN       // Array[7]  — plan diario de comidas
  const dayChips    = DAY_CHIPS       // Array[7]  — chips del day-strip

  // Plan de entrenamiento
  const races       = RACES           // Array     — carreras objetivo
  const phases      = PHASES          // Array     — fases de entrenamiento
  const currentWeek = CURRENT_WEEK    // Object    — semana en curso

  // Medidas corporales
  const medidasData    = MEDIDAS_DATA    // Object — series por métrica
  const garmin         = GARMIN          // Object — snapshot Garmin
  const pesoRegistros  = PESO_REGISTROS  // Array  — registros de peso brutos

  // Despensa — catálogo
  const cats        = CATS            // Array     — categorías
  const pantryItems = ITEMS           // Array     — ítems del catálogo
  const needsBuying = NEEDS_BUYING    // Set       — ítems sin stock por defecto

  // ════════════════════════════════════════════════════════════════════════
  // ESTADO UI
  // ════════════════════════════════════════════════════════════════════════

  const nutriActiveDay = ref(null)    // null = hoy; número (0-6) cuando usuario selecciona
  const chartView      = ref('todo')  // 'todo' | '30d' | '7d'

  // ════════════════════════════════════════════════════════════════════════
  // CHECKLIST (localStorage, por día)
  // ════════════════════════════════════════════════════════════════════════

  const _checkAll = ref(lsGet(CHECKLIST_KEY))

  function _checkDay() {
    const k = todayKey()
    if (!_checkAll.value[k]) _checkAll.value[k] = {}
    return _checkAll.value[k]
  }

  function isChecked(id) {
    return !!_checkDay()[id]
  }

  function toggleCheck(id) {
    _checkDay()[id] = !_checkDay()[id]
    lsSet(CHECKLIST_KEY, _checkAll.value)
  }

  function resetChecklist() {
    _checkAll.value[todayKey()] = {}
    lsSet(CHECKLIST_KEY, _checkAll.value)
  }

  // ════════════════════════════════════════════════════════════════════════
  // DESPENSA (localStorage)
  // ════════════════════════════════════════════════════════════════════════

  const _despState = ref({})

  function _initDesp() {
    const saved = lsGet(DESPENSA_KEY)
    const result = {}
    for (const item of ITEMS) {
      result[item.id] = saved[item.id] ?? {
        inDesp: !NEEDS_BUYING.has(item.id),
        bought: false,
      }
    }
    _despState.value = result
  }

  _initDesp()

  function _despPersist() {
    lsSet(DESPENSA_KEY, _despState.value)
  }

  function moveToCompra(id) {
    if (!_despState.value[id]) return
    _despState.value[id] = { inDesp: false, bought: false }
    _despPersist()
  }

  function toggleBought(id) {
    if (!_despState.value[id]) return
    const cur = _despState.value[id]
    _despState.value[id] = { ...cur, bought: !cur.bought }
    if (_despState.value[id].bought) {
      setTimeout(() => {
        if (_despState.value[id]?.bought) {
          _despState.value[id] = { inDesp: true, bought: false }
          _despPersist()
        }
      }, 700)
    }
    _despPersist()
  }

  function markAllBought() {
    for (const item of ITEMS) {
      _despState.value[item.id] = { inDesp: true, bought: false }
    }
    _despPersist()
  }

  const inDesp   = computed(() => ITEMS.filter(i => _despState.value[i.id]?.inDesp))
  const inCompra = computed(() => ITEMS.filter(i => _despState.value[i.id] && !_despState.value[i.id].inDesp))

  function isBought(id) {
    return !!_despState.value[id]?.bought
  }

  // ════════════════════════════════════════════════════════════════════════
  // EXPORTS
  // ════════════════════════════════════════════════════════════════════════

  return {
    // Datos estáticos — nutrición
    weekPlan,
    dayChips,

    // Datos estáticos — plan de entrenamiento
    races,
    phases,
    currentWeek,

    // Datos estáticos — medidas
    medidasData,
    garmin,
    pesoRegistros,

    // Datos estáticos — despensa
    cats,
    pantryItems,
    needsBuying,

    // Estado UI
    nutriActiveDay,
    chartView,

    // Checklist
    isChecked,
    toggleCheck,
    resetChecklist,

    // Despensa
    inDesp,
    inCompra,
    moveToCompra,
    toggleBought,
    markAllBought,
    isBought,
  }
})
