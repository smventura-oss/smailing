<template>
  <div>
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">Plan · Semana {{ semanaNum }}</div>
      <div class="screen-title">{{ kmCompletados }} / {{ kmTotales }} km</div>
      <div class="screen-sub">{{ sesionesHechas }} de {{ sesionesSemana }} sesiones · {{ tiempoTotal }}</div>
    </header>

    <!-- Selector de semana -->
    <div class="card semana-nav">
      <button class="semana-btn" @click="cambiarSemana(-1)">‹</button>
      <span class="semana-label">{{ labelSemana }}</span>
      <button class="semana-btn" @click="cambiarSemana(1)">›</button>
    </div>

    <!-- Resumen semana -->
    <div class="card stats-row">
      <div v-for="s in statsResumen" :key="s.label" class="stat-item">
        <div class="stat-val">{{ s.val }}</div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </div>

    <!-- Días -->
    <div
      v-for="dia in diasSemana"
      :key="dia.fecha"
      class="card dia-card"
      :class="{ 'dia-hoy': dia.esHoy, 'dia-descanso': dia.tipo === 'rest' }"
    >
      <div class="dia-header">
        <div class="dia-fecha-wrap">
          <span class="dia-nombre">{{ dia.nombre }}</span>
          <span class="dia-fecha">{{ dia.fechaLabel }}</span>
        </div>
        <span class="dia-estado" :class="estadoClass(dia)">{{ estadoLabel(dia) }}</span>
      </div>

      <div v-if="dia.tipo !== 'rest'" class="dia-sesion">
        <div class="sesion-tipo-row">
          <span class="sesion-emoji">{{ dia.emoji }}</span>
          <span class="sesion-nombre">{{ dia.sesion }}</span>
        </div>
        <div class="sesion-chips">
          <span v-if="dia.km"       class="chip chip-grey">🏃 {{ dia.km }} km</span>
          <span v-if="dia.duracion" class="chip chip-grey">⏱ {{ dia.duracion }}</span>
          <span v-if="dia.zona"     class="chip" :class="zonaClass(dia.zona)">Z{{ dia.zona }}</span>
          <span v-if="dia.rpe"      class="chip chip-grey">RPE {{ dia.rpe }}</span>
        </div>
        <p v-if="dia.nota" class="sesion-nota">{{ dia.nota }}</p>
      </div>

      <div v-else class="dia-descanso-label">Descanso activo / recuperación</div>
    </div>

    <div class="spacer" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

/* semana */
const offsetSemana = ref(0)

function lunesDe(offset) {
  const hoy = new Date()
  const dia  = hoy.getDay() === 0 ? 6 : hoy.getDay() - 1
  const lun  = new Date(hoy)
  lun.setDate(hoy.getDate() - dia + offset * 7)
  lun.setHours(0, 0, 0, 0)
  return lun
}

const DIAS_CORTO  = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
const DIAS_LARGO  = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
const MESES       = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']

function semanaISO(d) {
  const tmp = new Date(d)
  tmp.setHours(0,0,0,0)
  tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7))
  const semYear = new Date(tmp.getFullYear(), 0, 4)
  return 1 + Math.round(((tmp - semYear) / 86400000 - 3 + ((semYear.getDay() + 6) % 7)) / 7)
}

const semanaNum = computed(() => semanaISO(lunesDe(offsetSemana.value)))

const labelSemana = computed(() => {
  const lun = lunesDe(offsetSemana.value)
  const dom = new Date(lun); dom.setDate(lun.getDate() + 6)
  if (offsetSemana.value === 0) return 'Esta semana'
  if (offsetSemana.value === -1) return 'Semana pasada'
  if (offsetSemana.value === 1) return 'Próxima semana'
  return `${lun.getDate()} ${MESES[lun.getMonth()]} – ${dom.getDate()} ${MESES[dom.getMonth()]}`
})

function cambiarSemana(d) { offsetSemana.value += d }

/* plan hardcodeado por día de semana (0=Lun … 6=Dom) */
const PLAN_TIPO = [
  { tipo: 'run',      emoji: '🏃', sesion: 'Rodaje suave',        km: 8,  duracion: '50 min', zona: 2, rpe: 5, nota: 'Ritmo conversacional, sin forzar.' },
  { tipo: 'fuerza',   emoji: '💪', sesion: 'Fuerza Garaje A',      km: 0,  duracion: '40 min', zona: null, rpe: 7, nota: 'Sentadilla, peso muerto, press.' },
  { tipo: 'run',      emoji: '🏃', sesion: 'Tempo 4×8 min',        km: 12, duracion: '65 min', zona: 4, rpe: 8, nota: 'Calentamiento 15 min + series.' },
  { tipo: 'rest',     emoji: '🧘', sesion: 'Descanso',             km: 0,  duracion: null,     zona: null, rpe: null, nota: null },
  { tipo: 'fuerza',   emoji: '💪', sesion: 'Fuerza Garaje B',      km: 0,  duracion: '40 min', zona: null, rpe: 7, nota: 'Piernas + core.' },
  { tipo: 'run',      emoji: '🏃', sesion: 'Tirada larga',         km: 22, duracion: '2h 10m', zona: 2, rpe: 6, nota: 'El km más importante de la semana.' },
  { tipo: 'run',      emoji: '🏃', sesion: 'Regenerativo',         km: 6,  duracion: '35 min', zona: 1, rpe: 4, nota: 'Muy suave, recuperación activa.' },
]

/* estado simulado: días anteriores a hoy → done/missed según tipo */
const diasSemana = computed(() => {
  const lun  = lunesDe(offsetSemana.value)
  const hoy  = new Date(); hoy.setHours(0,0,0,0)
  return PLAN_TIPO.map((p, i) => {
    const fecha = new Date(lun); fecha.setDate(lun.getDate() + i)
    const esHoy = fecha.getTime() === hoy.getTime()
    const pasado = fecha < hoy
    let estado = 'pending'
    if (esHoy) estado = 'today'
    else if (pasado) estado = i === 3 ? 'rest' : (Math.random() > 0.25 ? 'done' : 'missed')
    return { ...p, fecha: fecha.getTime(), fechaLabel: `${fecha.getDate()} ${MESES[fecha.getMonth()]}`, nombre: DIAS_LARGO[i], esHoy, estado }
  })
})

/* stats */
const kmTotales     = computed(() => PLAN_TIPO.reduce((s, d) => s + (d.km || 0), 0))
const kmCompletados = computed(() => diasSemana.value.filter(d => d.estado === 'done').reduce((s, d) => s + (d.km || 0), 0))
const sesionesHechas = computed(() => diasSemana.value.filter(d => d.estado === 'done').length)
const sesionesSemana = computed(() => PLAN_TIPO.filter(d => d.tipo !== 'rest').length)
const tiempoTotal    = computed(() => {
  const mins = diasSemana.value.filter(d => d.estado === 'done' && d.duracion)
    .reduce((s, d) => {
      const m = d.duracion.match(/(\d+)h\s*(\d+)?m?/)
      if (!m) { const n = d.duracion.match(/(\d+)/); return s + (n ? +n[1] : 0) }
      return s + (+m[1]) * 60 + (+(m[2] || 0))
    }, 0)
  return mins >= 60 ? `${Math.floor(mins/60)}h ${mins%60}m` : `${mins}m`
})

const statsResumen = computed(() => [
  { val: `${kmCompletados.value} km`, label: 'Completados' },
  { val: `${kmTotales.value} km`,     label: 'Planificados' },
  { val: tiempoTotal.value || '—',    label: 'Tiempo' },
  { val: `${sesionesHechas.value}/${sesionesSemana.value}`, label: 'Sesiones' },
])

/* helpers */
function estadoLabel(dia) {
  if (dia.tipo === 'rest')  return '😴 Descanso'
  if (dia.estado === 'done')    return '✓ Hecho'
  if (dia.estado === 'missed')  return '✗ Perdido'
  if (dia.estado === 'today')   return '→ Hoy'
  return '· Pendiente'
}
function estadoClass(dia) {
  if (dia.tipo === 'rest')      return 'estado-grey'
  if (dia.estado === 'done')    return 'estado-green'
  if (dia.estado === 'missed')  return 'estado-red'
  if (dia.estado === 'today')   return 'estado-orange'
  return 'estado-grey'
}
function zonaClass(z) {
  return { 1: 'chip-grey', 2: 'chip-green', 3: 'chip-green', 4: 'chip-orange', 5: 'chip-red' }[z] || 'chip-grey'
}
</script>

<style scoped>
/* semana nav */
.semana-nav { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding: 10px 16px; }
.semana-btn { background: none; border: none; font-size: 22px; color: var(--green); cursor: pointer; padding: 4px 8px; line-height: 1; }
.semana-label { font-weight: 700; font-size: 15px; }

/* stats */
.stats-row { display: flex; justify-content: space-around; padding: 14px 8px; }
.stat-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-val   { font-size: 18px; font-weight: 800; color: var(--green); }
.stat-label { font-size: 10px; color: var(--text-3); text-transform: uppercase; letter-spacing: .8px; }

/* día */
.dia-card { border-left: 3px solid transparent; }
.dia-hoy  { border-left-color: var(--green); }
.dia-descanso { opacity: .65; }

.dia-header { display: flex; justify-content: space-between; align-items: flex-start; }
.dia-fecha-wrap { display: flex; flex-direction: column; gap: 1px; }
.dia-nombre { font-weight: 700; font-size: 15px; }
.dia-fecha  { font-size: 12px; color: var(--text-3); }

.dia-estado { font-size: 12px; font-weight: 700; }
.estado-green  { color: var(--green); }
.estado-red    { color: #c62828; }
.estado-orange { color: #e65100; }
.estado-grey   { color: var(--text-3); }

/* sesión */
.dia-sesion { margin-top: 10px; }
.sesion-tipo-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.sesion-emoji  { font-size: 18px; }
.sesion-nombre { font-size: 14px; font-weight: 600; color: var(--text); }
.sesion-chips  { display: flex; flex-wrap: wrap; gap: 6px; }
.sesion-nota   { font-size: 12px; color: var(--text-3); margin-top: 8px; font-style: italic; }
.dia-descanso-label { font-size: 13px; color: var(--text-3); margin-top: 8px; }
</style>
