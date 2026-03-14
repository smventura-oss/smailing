import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

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
  // DATOS ESTÁTICOS (read-only, importados de /data)
  // ════════════════════════════════════════════════════════════════════════

  const weekPlan    = WEEK_PLAN
  const dayChips    = DAY_CHIPS
  const races       = RACES
  const phases      = PHASES
  const currentWeek = CURRENT_WEEK
  const medidasData = MEDIDAS_DATA
  const garmin      = GARMIN
  const cats        = CATS
  const pantryItems = ITEMS
  const needsBuying = NEEDS_BUYING

  // ════════════════════════════════════════════════════════════════════════
  // PESO REGISTROS (reactivo — seed estático, reemplazado desde Supabase)
  // ════════════════════════════════════════════════════════════════════════

  const pesoRegistros = ref([...PESO_REGISTROS])

  // Carga todos los registros del usuario desde Supabase.
  // Llama desde MedidasView al montar.
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

  // Inserta o actualiza un registro de peso.
  // Devuelve null en éxito, string de error si falla.
  async function addPesoRegistro(fecha, peso) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return 'No autenticado'

    const { error } = await supabase
      .from('peso_registros')
      .upsert({ user_id: user.id, fecha, peso }, { onConflict: 'user_id,fecha' })
    if (error) return error.message

    // Update local state
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
    // Sync to Supabase in background (fire and forget)
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

  // Carga el estado del checklist de hoy desde Supabase y lo fusiona con localStorage.
  // Supabase gana en conflictos (más reciente = más fiable).
  // Llama desde HoyView al montar.
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
