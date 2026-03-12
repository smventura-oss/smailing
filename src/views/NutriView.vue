<template>
  <div>
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">Nutrición · {{ fechaHoy }}</div>
      <div class="screen-title">{{ kcalRestantes }} kcal</div>
      <div class="screen-sub">{{ kcalComidas }} comidas · {{ kcalConsumidas }} consumidas</div>
    </header>

    <!-- Calorías ring + macros -->
    <div class="card macros-card">
      <div class="macros-top">
        <div class="kcal-ring-wrap">
          <svg viewBox="0 0 80 80" class="kcal-ring">
            <circle cx="40" cy="40" r="34" class="ring-bg" />
            <circle cx="40" cy="40" r="34" class="ring-fill"
              :stroke-dasharray="`${ringPct * 213.6 / 100} 213.6`"
              stroke-dashoffset="53.4"
            />
          </svg>
          <div class="ring-label">
            <span class="ring-val">{{ pct }}%</span>
            <span class="ring-sub">objetivo</span>
          </div>
        </div>
        <div class="macros-list">
          <MacroBar v-for="m in macros" :key="m.key" :macro="m" />
        </div>
      </div>
    </div>

    <!-- Agua -->
    <div class="card agua-card">
      <div class="agua-header">
        <span class="agua-title">💧 Agua</span>
        <span class="agua-val">{{ aguaVasos }} / 8 vasos</span>
      </div>
      <div class="agua-dots">
        <button
          v-for="i in 8"
          :key="i"
          class="agua-dot"
          :class="{ filled: i <= aguaVasos }"
          @click="toggleAgua(i)"
        />
      </div>
    </div>

    <!-- Comidas -->
    <div
      v-for="comida in comidas"
      :key="comida.id"
      class="card comida-card"
    >
      <div class="comida-header">
        <div class="comida-meta">
          <span class="comida-emoji">{{ comida.emoji }}</span>
          <div>
            <div class="comida-nombre">{{ comida.nombre }}</div>
            <div class="comida-hora">{{ comida.hora }}</div>
          </div>
        </div>
        <span class="comida-kcal">{{ comida.kcal }} kcal</span>
      </div>
      <div v-if="comida.items.length" class="comida-items">
        <div v-for="(it, idx) in comida.items" :key="idx" class="comida-item">
          <span class="ci-nombre">{{ it.nombre }}</span>
          <span class="ci-kcal">{{ it.kcal }} kcal</span>
        </div>
      </div>
      <div v-else class="comida-vacia">Sin registrar</div>
    </div>

    <div class="spacer" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MacroBar from '../components/nutri/MacroBar.vue'

/* scroll shrink */
const shrunk  = ref(false)
let ticking   = false
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => { shrunk.value = window.scrollY > 30; ticking = false })
    ticking = true
  }
}
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

/* fecha */
const DIAS  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const hoy   = new Date()
const fechaHoy = `${DIAS[hoy.getDay()]} ${hoy.getDate()} ${MESES[hoy.getMonth()]}`

/* calorías */
const kcalObj      = 1900
const kcalConsumidas = ref(1340)
const kcalRestantes  = computed(() => kcalObj - kcalConsumidas.value)
const kcalComidas    = computed(() => comidas.value.filter(c => c.kcal > 0).length)
const pct            = computed(() => Math.min(100, Math.round((kcalConsumidas.value / kcalObj) * 100)))
const ringPct        = computed(() => pct.value)

/* macros */
const macros = ref([
  { key: 'prot',  label: 'Proteína', emoji: '🥩', actual: 98,  obj: 150, unit: 'g', color: '#e65100' },
  { key: 'carbs', label: 'Carbos',   emoji: '🍞', actual: 140, obj: 200, unit: 'g', color: '#1565c0' },
  { key: 'grasa', label: 'Grasa',    emoji: '🥑', actual: 44,  obj: 60,  unit: 'g', color: '#6a1c9a' },
])

/* agua */
const aguaVasos = ref(3)
function toggleAgua(i) {
  aguaVasos.value = aguaVasos.value === i ? i - 1 : i
}

/* comidas */
const comidas = ref([
  {
    id: 'desayuno', emoji: '🌅', nombre: 'Desayuno', hora: '08:15',
    kcal: 420,
    items: [
      { nombre: 'Avena con leche',    kcal: 280 },
      { nombre: 'Plátano',            kcal: 95  },
      { nombre: 'Café con leche',     kcal: 45  },
    ],
  },
  {
    id: 'almuerzo', emoji: '☀️', nombre: 'Almuerzo', hora: '13:30',
    kcal: 620,
    items: [
      { nombre: 'Arroz integral 200g', kcal: 260 },
      { nombre: 'Pechuga plancha',     kcal: 220 },
      { nombre: 'Ensalada verde',      kcal: 40  },
      { nombre: 'Fruta',               kcal: 100 },
    ],
  },
  {
    id: 'snack', emoji: '🍎', nombre: 'Snack', hora: '17:00',
    kcal: 300,
    items: [
      { nombre: 'Yogur griego 0%',    kcal: 130 },
      { nombre: 'Nueces 30g',          kcal: 170 },
    ],
  },
  {
    id: 'cena', emoji: '🌙', nombre: 'Cena', hora: '—',
    kcal: 0,
    items: [],
  },
])
</script>

<style scoped>
/* macros card */
.macros-card { margin-top: 12px; }
.macros-top { display: flex; gap: 16px; align-items: center; }

/* ring */
.kcal-ring-wrap { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
.kcal-ring { width: 80px; height: 80px; transform: rotate(-90deg); }
.ring-bg   { fill: none; stroke: #e8e8e8; stroke-width: 8; }
.ring-fill { fill: none; stroke: var(--green); stroke-width: 8; stroke-linecap: round; transition: stroke-dasharray 600ms cubic-bezier(.4,0,.2,1); }
.ring-label { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.ring-val { font-size: 16px; font-weight: 800; color: var(--green); line-height: 1; }
.ring-sub { font-size: 9px; color: var(--text-3); }

/* macros list */
.macros-list { flex: 1; display: flex; flex-direction: column; gap: 8px; }

/* agua */
.agua-card { }
.agua-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.agua-title { font-weight: 700; font-size: 15px; }
.agua-val { font-size: 13px; color: var(--text-2); font-weight: 600; }
.agua-dots { display: flex; gap: 8px; }
.agua-dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #b3d9f0; background: none; cursor: pointer; transition: background 200ms, border-color 200ms; -webkit-tap-highlight-color: transparent; }
.agua-dot.filled { background: #1e90ff; border-color: #1e90ff; }

/* comidas */
.comida-header { display: flex; justify-content: space-between; align-items: center; }
.comida-meta { display: flex; align-items: center; gap: 10px; }
.comida-emoji { font-size: 22px; }
.comida-nombre { font-weight: 700; font-size: 15px; }
.comida-hora { font-size: 12px; color: var(--text-3); margin-top: 1px; }
.comida-kcal { font-size: 15px; font-weight: 700; color: var(--green); }
.comida-items { margin-top: 10px; border-top: 1px solid #f0f0f0; padding-top: 8px; display: flex; flex-direction: column; gap: 6px; }
.comida-item { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-2); }
.ci-kcal { font-weight: 600; color: var(--text-3); }
.comida-vacia { margin-top: 8px; font-size: 13px; color: var(--text-3); font-style: italic; }
</style>
