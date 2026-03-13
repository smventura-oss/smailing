<template>
  <div>
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">Seguimiento · Composición corporal</div>
      <div class="screen-title">📏 Medidas</div>
      <div class="screen-sub">Peso diario · Próxima medición: 1 abr</div>
    </header>

    <!-- Weight chart -->
    <div class="chart-wrap" style="margin-top:12px;">
      <div class="chart-header">
        <div class="chart-ttl">Evolución del peso</div>
      </div>
      <div style="display:flex;gap:4px;margin-bottom:12px;">
        <button
          v-for="v in VIEWS"
          :key="v.id"
          class="peso-vtab"
          :class="{ 'peso-vtab-active': chartView === v.id }"
          @click="chartView = v.id"
        >{{ v.label }}</button>
      </div>
      <WeightChart :view="chartView" />
    </div>

    <!-- Garmin card -->
    <div class="card-title" style="margin-top:16px;">⌚ Garmin · {{ GARMIN.date }}</div>
    <div class="card" style="margin-top:4px;">
      <!-- Row 1 -->
      <div class="garmin-grid">
        <div class="garmin-cell right-border">
          <div class="garmin-lbl">Training Status</div>
          <div class="garmin-val" :style="{ color: GARMIN.trainingStatus.color }">{{ GARMIN.trainingStatus.val }}</div>
          <div class="garmin-sub" :style="{ color: GARMIN.trainingStatus.color }">{{ GARMIN.trainingStatus.sub }}</div>
        </div>
        <div class="garmin-cell">
          <div class="garmin-lbl">VO₂ Max</div>
          <div class="garmin-val lg" :style="{ color: GARMIN.vo2max.color }">{{ GARMIN.vo2max.val }}</div>
          <div class="garmin-sub">{{ GARMIN.vo2max.sub }}</div>
        </div>
      </div>
      <!-- Row 2 -->
      <div class="garmin-grid">
        <div class="garmin-cell right-border">
          <div class="garmin-lbl">HRV Status</div>
          <div class="garmin-val" :style="{ color: GARMIN.hrv.color }">{{ GARMIN.hrv.val }}</div>
          <div class="garmin-sub" :style="{ color: GARMIN.hrv.color }">{{ GARMIN.hrv.sub }}</div>
        </div>
        <div class="garmin-cell">
          <div class="garmin-lbl">Body Battery</div>
          <div class="garmin-val lg" :style="{ color: GARMIN.bodyBattery.color }">{{ GARMIN.bodyBattery.val }}</div>
          <div class="garmin-sub" :style="{ color: GARMIN.bodyBattery.color }">{{ GARMIN.bodyBattery.sub }}</div>
        </div>
      </div>
      <!-- Row 3 -->
      <div class="garmin-grid">
        <div class="garmin-cell right-border">
          <div class="garmin-lbl">Training Load</div>
          <div class="garmin-val sm" :style="{ color: GARMIN.trainingLoad.color }">{{ GARMIN.trainingLoad.val }}</div>
          <div class="garmin-sub">{{ GARMIN.trainingLoad.sub }}</div>
          <div class="garmin-sub" style="color:#b8860b;">{{ GARMIN.trainingLoad.sub2 }}</div>
        </div>
        <div class="garmin-cell">
          <div class="garmin-lbl">Sleep Score</div>
          <div class="garmin-val" :style="{ color: GARMIN.sleep.color }">{{ GARMIN.sleep.val }}</div>
          <div class="garmin-sub">{{ GARMIN.sleep.sub }}</div>
        </div>
      </div>
      <!-- Row 4 -->
      <div class="garmin-grid" style="border-bottom:none;">
        <div class="garmin-cell right-border">
          <div class="garmin-lbl">Fitness Age</div>
          <div class="garmin-val lg" :style="{ color: GARMIN.fitnessAge.color }">{{ GARMIN.fitnessAge.val }}</div>
          <div class="garmin-sub">{{ GARMIN.fitnessAge.sub }}</div>
        </div>
        <div class="garmin-cell">
          <div class="garmin-lbl">FC Reposo</div>
          <div class="garmin-val" :style="{ color: GARMIN.fcReposo.color }">{{ GARMIN.fcReposo.val }}</div>
        </div>
      </div>
    </div>

    <!-- Body measurements -->
    <div class="card-title" style="margin-top:4px;">📐 Medidas · 2 mar 2026</div>
    <div class="card" style="margin-top:4px;">
      <div
        v-for="row in MEASUREMENT_ROWS"
        :key="row.key"
        class="row row-link"
        @click="openSheet(row.key)"
      >
        <span>{{ row.label }}</span>
        <span>
          <span v-if="row.tag" class="tag" :class="row.tag.cls">{{ row.tag.text }}</span>
          <span v-else class="row-dim">{{ row.display }}</span>
          <span class="row-arrow">›</span>
        </span>
      </div>
    </div>

    <!-- Key indicators -->
    <div class="card-title" style="margin-top:4px;">📊 Indicadores clave</div>
    <div class="card">
      <div v-for="row in INDICATOR_ROWS" :key="row.key" class="row row-link" @click="openSheet(row.key)">
        <span>{{ row.label }}</span>
        <span>
          <span v-if="row.tag" class="tag" :class="row.tag.cls">{{ row.tag.text }}</span>
          <span v-else class="row-dim">{{ row.display }}</span>
          <span class="row-arrow">›</span>
        </span>
      </div>
    </div>

    <div class="note green" style="margin-top:8px;">
      📅 Próxima medición: <strong>1 de abril 2026</strong>. Espera cintura −2/−3 cm con el plan actual.
    </div>
    <div style="height:8px" />

    <BottomSheet :open="sheetOpen" :data="sheetData" @close="sheetOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useShrinkHeader } from '@/composables/useShrinkHeader'
import { MEDIDAS_DATA, GARMIN } from '@/data/medidas'
import WeightChart from '@/components/medidas/WeightChart.vue'
import BottomSheet from '@/components/medidas/BottomSheet.vue'

const { shrunk }  = useShrinkHeader()
const chartView   = ref('dia')
const sheetOpen   = ref(false)
const sheetKey    = ref(null)
const sheetData   = computed(() => sheetKey.value ? MEDIDAS_DATA[sheetKey.value] : null)

const VIEWS = [
  { id: 'dia', label: 'Diario' },
  { id: 'sem', label: 'Semanal' },
  { id: 'mes', label: 'Mensual' },
]

function openSheet(key) {
  sheetKey.value = key
  sheetOpen.value = true
}

const MEASUREMENT_ROWS = [
  { key: 'peso',     label: 'Peso',     display: '79.40 kg · 11 mar' },
  { key: 'cintura',  label: 'Cintura',  tag: { cls: 'amber', text: '89 cm ⚠️' } },
  { key: 'abdomen',  label: 'Abdomen',  tag: { cls: 'amber', text: '96 cm ⚠️' } },
  { key: 'cadera',   label: 'Cadera',   display: '94 cm' },
  { key: 'pecho',    label: 'Pecho',    display: '99 cm' },
  { key: 'hombros',  label: 'Hombros',  display: '117 cm' },
  { key: 'brazo',    label: 'Brazo',    display: '35.5 cm' },
  { key: 'muslo',    label: 'Muslo',    display: '67.5 cm' },
  { key: 'gemelo',   label: 'Gemelo',   display: '39 cm' },
]

const INDICATOR_ROWS = [
  { key: 'ratio',    label: 'Ratio cintura/cadera',    tag: { cls: 'amber', text: '0.95' } },
  { key: 'grasa',    label: 'Grasa corporal estimada', display: '~22-24%' },
  { key: 'peso',     label: 'Peso objetivo maratón',   display: '70 kg · −9.65 kg' },
]
</script>

<style scoped>
.garmin-grid { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #f2f2f0; }
.garmin-cell { padding: 14px 18px; }
.right-border { border-right: 1px solid #f2f2f0; }
.garmin-lbl { font-size: 10px; color: #767676; font-weight: 500; text-transform: uppercase; letter-spacing: .8px; margin-bottom: 6px; }
.garmin-val { font-size: 22px; font-weight: 800; line-height: 1; }
.garmin-val.lg { font-size: 32px; }
.garmin-val.sm { font-size: 18px; font-weight: 700; }
.garmin-sub { font-size: 12px; color: #888; margin-top: 4px; font-weight: 400; }
</style>
