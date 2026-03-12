<template>
  <div class="card garmin-card">
    <div class="g-header">
      <span class="g-title">Garmin hoy</span>
      <span class="chip" :class="statusChip">{{ datos.status }}</span>
    </div>
    <div class="g-grid">
      <div class="g-item">
        <div class="g-val">{{ datos.bodyBattery }}</div>
        <div class="g-label">Body Battery</div>
      </div>
      <div class="g-item">
        <div class="g-val">{{ datos.hrv }}<small>ms</small></div>
        <div class="g-label">HRV · {{ datos.hrvEstado }}</div>
      </div>
      <div class="g-item">
        <div class="g-val">{{ datos.sleepScore }}</div>
        <div class="g-label">Sueño · {{ datos.sleepDuracion }}</div>
      </div>
      <div class="g-item">
        <div class="g-val">{{ datos.vo2max }}</div>
        <div class="g-label">VO2Max</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ datos: { type: Object, required: true } })
const statusChip = computed(() => ({
  'chip-green':  ['Peaking','Productive'].includes(props.datos.status),
  'chip-orange': props.datos.status === 'Strained',
  'chip-grey':   props.datos.status === 'Recovery',
}))
</script>
<style scoped>
.garmin-card { margin-top: 12px; }
.g-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.g-title { font-weight: 700; font-size: 15px; }
.g-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.g-item { background: var(--bg); border-radius: 10px; padding: 10px 12px; }
.g-val { font-size: 24px; font-weight: 800; color: var(--green); line-height: 1; }
.g-val small { font-size: 13px; font-weight: 500; }
.g-label { font-size: 11px; color: var(--text-3); margin-top: 3px; }
</style>
