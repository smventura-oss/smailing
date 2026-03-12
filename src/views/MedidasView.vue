<template>
  <div>
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">Medidas · seguimiento</div>
      <div class="screen-title">{{ pesoActual }} kg</div>
      <div class="screen-sub">{{ diffPeso }} vs hace 30 días · objetivo 70 kg</div>
    </header>

    <!-- Gráfica peso -->
    <div class="card">
      <div class="chart-header">
        <span class="chart-title">⚖️ Peso corporal</span>
        <div class="chart-tabs">
          <button
            v-for="t in periodos"
            :key="t.val"
            class="chart-tab"
            :class="{ active: periodo === t.val }"
            @click="periodo = t.val"
          >{{ t.label }}</button>
        </div>
      </div>
      <PesoChart :puntos="puntosVisibles" :min="chartMin" :max="chartMax" />
      <div class="chart-meta">
        <span>Min <b>{{ chartMin }} kg</b></span>
        <span>Media <b>{{ mediaStr }} kg</b></span>
        <span>Max <b>{{ chartMax }} kg</b></span>
      </div>
    </div>

    <!-- Registro rápido -->
    <div class="card registro-card">
      <div class="reg-title">Registrar hoy</div>
      <div class="reg-row">
        <div class="reg-field">
          <label>Peso (kg)</label>
          <div class="reg-input-wrap">
            <button class="reg-step" @click="pesoInput = round(pesoInput - 0.1)">−</button>
            <span class="reg-val">{{ pesoInput }}</span>
            <button class="reg-step" @click="pesoInput = round(pesoInput + 0.1)">+</button>
          </div>
        </div>
        <div class="reg-field">
          <label>Grasa (%)</label>
          <div class="reg-input-wrap">
            <button class="reg-step" @click="grasaInput = round(grasaInput - 0.1)">−</button>
            <span class="reg-val">{{ grasaInput }}</span>
            <button class="reg-step" @click="grasaInput = round(grasaInput + 0.1)">+</button>
          </div>
        </div>
      </div>
      <button class="reg-guardar" @click="guardarHoy">Guardar registro de hoy</button>
    </div>

    <!-- Métricas corporales -->
    <div class="card">
      <div class="metricas-title">📐 Métricas corporales</div>
      <div class="metricas-grid">
        <MetricaItem v-for="m in metricas" :key="m.label" :metrica="m" />
      </div>
    </div>

    <!-- Hitos -->
    <div class="card">
      <div class="hitos-title">🏆 Hitos de peso</div>
      <div class="hito-row" v-for="h in hitos" :key="h.label">
        <div class="hito-meta">
          <span class="hito-label">{{ h.label }}</span>
          <span class="hito-fecha">{{ h.fecha }}</span>
        </div>
        <span class="hito-val" :class="h.clase">{{ h.val }} kg</span>
      </div>
    </div>

    <div class="spacer" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PesoChart from '../components/medidas/PesoChart.vue'
import MetricaItem from '../components/medidas/MetricaItem.vue'

/* scroll shrink */
const shrunk = ref(false)
let ticking  = false
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => { shrunk.value = window.scrollY > 30; ticking = false })
    ticking = true
  }
}
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

/* helpers */
const round = v => Math.round(v * 10) / 10

/* datos de peso (últimos 90 días simulados) */
function generarPesos(dias, inicio, variacion) {
  const arr = []
  let v = inicio
  for (let i = dias; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i)
    v = round(v + (Math.random() - 0.52) * variacion)
    arr.push({ fecha: d, val: v })
  }
  return arr
}
const todosPuntos = generarPesos(90, 77.4, 0.35)

const periodo  = ref('30d')
const periodos = [
  { val: '7d',  label: '7d'  },
  { val: '30d', label: '30d' },
  { val: '90d', label: '90d' },
]

const puntosVisibles = computed(() => {
  const dias = { '7d': 7, '30d': 30, '90d': 90 }[periodo.value]
  return todosPuntos.slice(-dias - 1)
})

const pesoActual = computed(() => todosPuntos.at(-1).val)
const diffPeso   = computed(() => {
  const hace30 = todosPuntos[todosPuntos.length - 31]?.val ?? todosPuntos[0].val
  const d = round(pesoActual.value - hace30)
  return (d > 0 ? '+' : '') + d
})

const chartMin = computed(() => Math.floor(Math.min(...puntosVisibles.value.map(p => p.val)) - 0.5))
const chartMax = computed(() => Math.ceil(Math.max(...puntosVisibles.value.map(p => p.val)) + 0.5))
const mediaStr = computed(() => round(puntosVisibles.value.reduce((s, p) => s + p.val, 0) / puntosVisibles.value.length))

/* registro */
const pesoInput  = ref(pesoActual.value)
const grasaInput = ref(18.4)
function guardarHoy() {
  todosPuntos.push({ fecha: new Date(), val: pesoInput.value })
  // en el futuro → supabase insert
}

/* métricas */
const metricas = ref([
  { label: 'IMC',         val: '23.8',  unit: '',   diff: '-0.4',  trend: 'down' },
  { label: 'Grasa',       val: '18.4',  unit: '%',  diff: '-0.8',  trend: 'down' },
  { label: 'Músculo',     val: '42.1',  unit: 'kg', diff: '+0.3',  trend: 'up'   },
  { label: 'Agua',        val: '58.2',  unit: '%',  diff: '+0.5',  trend: 'up'   },
  { label: 'Cintura',     val: '84',    unit: 'cm', diff: '-1',    trend: 'down' },
  { label: 'Cadera',      val: '97',    unit: 'cm', diff: '0',     trend: 'flat' },
])

/* hitos */
const hitos = ref([
  { label: 'Peso actual',  fecha: 'hoy',       val: pesoActual,          clase: 'hito-neutral' },
  { label: 'Mínimo 90d',   fecha: '14 feb',    val: 74.8,                clase: 'hito-bueno'   },
  { label: 'Máximo 90d',   fecha: '2 ene',     val: 78.9,                clase: 'hito-malo'    },
  { label: 'Objetivo',     fecha: 'maratón 27', val: 70,                 clase: 'hito-obj'     },
])
</script>

<style scoped>
/* gráfica header */
.chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.chart-title  { font-weight: 700; font-size: 15px; }
.chart-tabs   { display: flex; gap: 4px; }
.chart-tab    { border: none; background: #f0f0f0; border-radius: 8px; padding: 4px 10px; font-size: 12px; font-weight: 600; color: var(--text-3); cursor: pointer; }
.chart-tab.active { background: var(--green-light); color: var(--green); }
.chart-meta   { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-3); margin-top: 8px; }
.chart-meta b { color: var(--text-2); }

/* registro */
.reg-title  { font-weight: 700; font-size: 15px; margin-bottom: 12px; }
.reg-row    { display: flex; gap: 16px; margin-bottom: 14px; }
.reg-field  { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.reg-field label { font-size: 12px; color: var(--text-3); font-weight: 600; }
.reg-input-wrap  { display: flex; align-items: center; justify-content: space-between; background: var(--bg); border-radius: 10px; padding: 8px 12px; }
.reg-step   { background: none; border: none; font-size: 20px; font-weight: 700; color: var(--green); cursor: pointer; line-height: 1; padding: 0 4px; }
.reg-val    { font-size: 20px; font-weight: 800; color: var(--text); }
.reg-guardar { width: 100%; padding: 12px; background: var(--green); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; }

/* métricas */
.metricas-title { font-weight: 700; font-size: 15px; margin-bottom: 12px; }
.metricas-grid  { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }

/* hitos */
.hitos-title { font-weight: 700; font-size: 15px; margin-bottom: 10px; }
.hito-row   { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #f0f0f0; }
.hito-row:last-child { border-bottom: none; }
.hito-meta  { display: flex; flex-direction: column; gap: 2px; }
.hito-label { font-size: 14px; font-weight: 600; }
.hito-fecha { font-size: 11px; color: var(--text-3); }
.hito-val   { font-size: 16px; font-weight: 800; }
.hito-bueno   { color: var(--green); }
.hito-malo    { color: #c62828; }
.hito-neutral { color: var(--text); }
.hito-obj     { color: #1565c0; }
</style>
