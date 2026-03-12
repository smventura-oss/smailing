<template>
  <div>
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">Hoy · {{ fechaHoy }}</div>
      <div class="screen-title">{{ tituloSesion }}</div>
      <div class="screen-sub">{{ subSesion }}</div>
    </header>
    <GarminCard :datos="garmin" />
    <div class="card">
      <div class="hoy-prog-top">
        <span class="hoy-prog-label">{{ progLabel }}</span>
        <span class="hoy-prog-pct">{{ progPct }}%</span>
      </div>
      <div class="prog-bar">
        <div class="prog-bar-fill" :style="{ width: progPct + '%' }" />
      </div>
    </div>
    <div class="card">
      <ChecklistItem
        v-for="item in checklist"
        :key="item.id"
        :item="item"
        @toggle="toggleItem"
      />
    </div>
    <div class="spacer" />
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import GarminCard from '../components/hoy/GarminCard.vue'
import ChecklistItem from '../components/hoy/ChecklistItem.vue'
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
const DIAS  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const hoy   = new Date()
const fechaHoy = `${DIAS[hoy.getDay()]} ${hoy.getDate()} ${MESES[hoy.getMonth()]}`
const tituloSesion = ref('Fuerza Garaje B')
const subSesion    = ref('35 min · 20h · Piernas + Core')
const garmin = ref({
  status: 'Strained', vo2max: 45, hrv: 30, hrvEstado: 'Low',
  bodyBattery: 27, sleepScore: 39, sleepDuracion: '5h49m',
})
const checklist = ref([
  { id: 'peso',     emoji: '⚖️',  label: 'Peso en ayunas',         done: false },
  { id: 'agua',     emoji: '💧',  label: '8 vasos de agua',         done: false },
  { id: 'sesion',   emoji: '💪',  label: 'Sesión completada',       done: false },
  { id: 'proteina', emoji: '🥩',  label: 'Proteína objetivo',       done: false },
  { id: 'sueno',    emoji: '😴',  label: 'Dormir antes de las 23h', done: false },
])
function toggleItem(id) {
  const item = checklist.value.find(i => i.id === id)
  if (item) item.done = !item.done
}
const progPct   = computed(() => Math.round((checklist.value.filter(i => i.done).length / checklist.value.length) * 100))
const progLabel = computed(() => `${checklist.value.filter(i => i.done).length} de ${checklist.value.length} tareas`)
</script>
<style scoped>
.hoy-prog-top { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: var(--text-2); }
.hoy-prog-pct { font-weight: 700; color: var(--green); }
.prog-bar { height: 6px; background: #e8e8e8; border-radius: 3px; overflow: hidden; }
.prog-bar-fill { height: 100%; background: var(--green); border-radius: 3px; transition: width 600ms cubic-bezier(.4,0,.2,1); }
</style>
