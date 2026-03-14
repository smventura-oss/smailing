import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

// In dev, Vite serves public/ at '/'. In prod, use the GitHub raw URL.
const DATA_URL = import.meta.env.PROD
  ? 'https://raw.githubusercontent.com/smventura-oss/smailing/main/public/smailing-data.json'
  : '/smailing-data.json'

// ── localStorage helpers ─────────────────────────────────────────────────
const CHECKLIST_KEY = 'smailing-checklist-v1'
const DESPENSA_KEY  = 'smailing-pantry-v1'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
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
  // DATOS ESTÁTICOS (poblados desde JSON al inicializar)
  // ════════════════════════════════════════════════════════════════════════

  const dataLoaded = ref(false)
  const dataError  = ref(null)

  const weekPlan    = ref([])
  const dayChips    = ref([])
  const races       = ref([])
  const phases      = ref([])
  const currentWeek = ref({ alert: '', warning: '', stats: [], rows: [], fuerzaA: { title: '', exercises: [] }, fuerzaB: { title: '', exercises: [] } })
  const medidasData = ref({})
  const garmin      = ref({})
  const cats        = ref([])
  const pantryItems = ref([])
  const needsBuying = ref([])

  // ════════════════════════════════════════════════════════════════════════
  // PESO REGISTROS (reactivo — seed desde JSON, reemplazado desde Supabase)
  // ════════════════════════════════════════════════════════════════════════

  const pesoRegistros = ref([])

  async function loadPesoRegistros() {
    const { data, error } = await supabase
      .from('peso_registros')
      .select('fecha, peso')
      .order('fecha', { ascending: true })
    if (error) { console.warn('[peso] load error', error.message); return }
    if (data?.length) {
      pesoRegistros.value = data.map(r => ({ fecha: r.fecha, peso: r.peso }))
    }
  }

  async function addPesoRegistro(fecha, peso) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return 'No autenticado'

    const { error } = await supabase
      .from('peso_registros')
      .upsert({ user_id: user.id, fecha, peso }, { onConflict: 'user_id,fecha' })
    if (error) return error.message

    const idx = pesoRegistros.value.findIndex(r => r.fecha === fecha)
    if (idx >= 0) {
      pesoRegistros.value[idx] = { fecha, peso }
    } else {
      pesoRegistros.value = [...pesoRegistros.value, { fecha, peso }]
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
    }
    return null
  }

  // ════════════════════════════════════════════════════════════════════════
  // INIT — fetch del JSON
  // ════════════════════════════════════════════════════════════════════════

  async function initAppData() {
    try {
      const res = await fetch(DATA_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const d = await res.json()

      weekPlan.value    = d.weekPlan
      dayChips.value    = d.dayChips
      races.value       = d.races
      phases.value      = d.phases
      currentWeek.value = d.currentWeek
      medidasData.value = d.medidasData
      garmin.value      = d.garmin
      cats.value        = d.cats
      pantryItems.value = d.items
      needsBuying.value = d.needsBuying
      pesoRegistros.value = d.pesoRegistros

      _initDesp()
      dataLoaded.value = true
    } catch (err) {
      console.error('[appData] fetch failed', err)
      dataError.value = err.message
    }
  }

  // Auto-fetch al crear el store
  initAppData()

  // ════════════════════════════════════════════════════════════════════════
  // ESTADO UI
  // ════════════════════════════════════════════════════════════════════════

  const nutriActiveDay = ref(null)
  const chartView      = ref('todo')

  // ════════════════════════════════════════════════════════════════════════
  // CHECKLIST (localStorage offline-first + Supabase sync en background)
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
    const checked = !_checkDay()[id]
    _checkDay()[id] = checked
    lsSet(CHECKLIST_KEY, _checkAll.value)
    _syncCheckItem(id, checked)
  }

  function resetChecklist() {
    _checkAll.value[todayKey()] = {}
    lsSet(CHECKLIST_KEY, _checkAll.value)
  }

  async function _syncCheckItem(itemId, checked) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('checklist_state').upsert(
      { user_id: user.id, fecha: todayISO(), item_id: itemId, checked },
      { onConflict: 'user_id,fecha,item_id' }
    )
  }

  async function loadChecklistFromSupabase() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('checklist_state')
      .select('item_id, checked')
      .eq('fecha', todayISO())
    if (error) { console.warn('[checklist] load error', error.message); return }
    if (!data?.length) return

    const day = _checkDay()
    for (const row of data) {
      day[row.item_id] = row.checked
    }
    lsSet(CHECKLIST_KEY, _checkAll.value)
  }

  // ════════════════════════════════════════════════════════════════════════
  // DESPENSA (localStorage)
  // ════════════════════════════════════════════════════════════════════════

  const _despState = ref({})

  function _initDesp() {
    const saved = lsGet(DESPENSA_KEY)
    const nbSet = new Set(needsBuying.value)
    const result = {}
    for (const item of pantryItems.value) {
      result[item.id] = saved[item.id] ?? {
        inDesp: !nbSet.has(item.id),
        bought: false,
      }
    }
    _despState.value = result
  }

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
    for (const item of pantryItems.value) {
      _despState.value[item.id] = { inDesp: true, bought: false }
    }
    _despPersist()
  }

  const inDesp   = computed(() => pantryItems.value.filter(i => _despState.value[i.id]?.inDesp))
  const inCompra = computed(() => pantryItems.value.filter(i => _despState.value[i.id] && !_despState.value[i.id].inDesp))

  function isBought(id) {
    return !!_despState.value[id]?.bought
  }

  // ════════════════════════════════════════════════════════════════════════
  // EXPORTS
  // ════════════════════════════════════════════════════════════════════════

  return {
    // Estado de carga
    dataLoaded,
    dataError,

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

    // Datos estáticos — despensa
    cats,
    pantryItems,
    needsBuying,

    // Peso (reactivo, Supabase)
    pesoRegistros,
    loadPesoRegistros,
    addPesoRegistro,

    // Estado UI
    nutriActiveDay,
    chartView,

    // Checklist (offline-first + Supabase sync)
    isChecked,
    toggleCheck,
    resetChecklist,
    loadChecklistFromSupabase,

    // Despensa
    inDesp,
    inCompra,
    moveToCompra,
    toggleBought,
    markAllBought,
    isBought,
  }
})
