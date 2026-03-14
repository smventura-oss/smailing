<template>
  <div>
    <!-- Header -->
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">{{ tag }}</div>
      <div class="screen-title">{{ title }}</div>
      <div class="screen-sub">{{ sub }}</div>
    </header>

    <!-- Progress -->
    <div class="card" style="margin-top:12px;">
      <div class="hoy-progress">
        <div class="hoy-prog-top">
          <div class="hoy-prog-label">{{ progLabel }}</div>
          <div class="hoy-prog-count">{{ doneCnt }} / {{ totalCnt }}</div>
        </div>
        <div class="hoy-prog-track">
          <div class="hoy-prog-fill" :style="{ width: pct + '%' }" />
        </div>
      </div>
    </div>

    <!-- Checklist -->
    <div class="card" style="margin-top:0;">
      <template v-for="section in sections" :key="section.title">
        <div class="cl-section">{{ section.title }}</div>
        <div
          v-for="item in section.items"
          :key="item.id"
          class="cl-item"
          :class="{ done: store.isChecked(item.id) }"
          @click="store.toggleCheck(item.id)"
        >
          <div class="cl-check">
            <svg class="cl-check-svg" viewBox="0 0 12 12" fill="none">
              <polyline points="1.5,6 5,9.5 10.5,2.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="cl-body">
            <div class="cl-label">{{ item.label }}</div>
            <div v-if="item.hint" class="cl-hint">{{ item.hint }}</div>
          </div>
          <button v-if="item.mealLink" class="cl-meal-btn" @click.stop="goToMeal(item.mealLink)">→</button>
        </div>
      </template>
    </div>

    <div style="height:12px" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useShrinkHeader } from '@/composables/useShrinkHeader'
import { useAppStore } from '@/stores/useAppStore'

const { shrunk } = useShrinkHeader()
const store      = useAppStore()
const router     = useRouter()

const MESES      = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const DIA_TIPO   = ['descanso','oficina','fuerza','fuerza','rodaje','tirada','descanso']
const DIA_NOMBRE = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
const DIA_EMOJI  = ['😴','🏢','💪','💪','🏃','🏔️','😴']

const WEEK_PLAN = store.weekPlan

const today   = new Date()
const planIdx = [6,0,1,2,3,4,5][today.getDay()]

const tag     = `${today.getDate()} ${MESES[today.getMonth()]}`
const title   = DIA_NOMBRE[planIdx]
const dayPlan = WEEK_PLAN[planIdx]
const sub     = dayPlan?.badge?.text ?? ''

let _idx = 0
function cid(p) { return `${p}-${++_idx}` }

function buildSections() {
  _idx = 0
  const tipo = DIA_TIPO[planIdx]
  const s = []

  // MAÑANA
  const morning = []
  if (tipo === 'oficina') {
    morning.push({ id: cid('m'), label: 'Suplementos en el bolsillo', hint: 'Malato + D3 + K2 + B12 para el desayuno en oficina' })
  } else {
    morning.push({ id: cid('m'), label: 'Suplementos del desayuno', hint: 'Malato + D3 + K2 + B12' })
  }
  if (tipo === 'tirada') {
    morning.push({ id: cid('m'), label: 'Preparar comida pre-tirada', hint: 'Tortillas + hummus + aguacate · lista para las 12h' })
    morning.push({ id: cid('m'), label: 'Cargar cinturón de hidratación', hint: '500ml agua + sales · listo antes de las 14h' })
  }
  if (tipo === 'rodaje' || tipo === 'tirada') {
    morning.push({ id: cid('m'), label: 'Hidratación desde el inicio', hint: 'Empieza con 500ml agua antes de café' })
  }
  s.push({ title: '🌅 Esta mañana', items: morning })

  // SESIÓN
  const ses = []
  if (tipo === 'descanso') {
    ses.push({ id: cid('s'), label: 'Descanso activo', hint: 'Movilidad o paseo suave · sin impacto' })
    ses.push({ id: cid('s'), label: 'Foam roller suave', hint: 'Zonas de tensión acumulada · 5 min' })
    s.push({ title: '😴 Descanso', items: ses })
  } else if (tipo === 'oficina') {
    ses.push({ id: cid('s'), label: 'Pedir ApetEat antes de las 11h', hint: 'Legumbre + proteína magra · sin fritos' })
    ses.push({ id: cid('s'), label: 'Honest Greens — bowl proteico', hint: 'Base cereal + proteína · sin salsas cremosas' })
    s.push({ title: '🏢 Oficina', items: ses })
  } else if (tipo === 'fuerza') {
    const L = planIdx === 2 ? 'A' : 'B'
    const tree = L === 'A' ? 'Tren inferior' : 'Tren superior + core'
    ses.push({ id: cid('s'), label: 'Colágeno 15g + zumo naranja', hint: '90 min antes del entreno · ~18:30h' })
    ses.push({ id: cid('s'), label: `Completar Sesión ${L} · 35 min`, hint: 'Calentamiento 5 min + ejercicios + vuelta calma' })
    ses.push({ id: cid('s'), label: 'Foam roller post-sesión', hint: 'Gemelos + cuádriceps · 5 min' })
    s.push({ title: `💪 Sesión de Fuerza ${L} — ${tree}`, items: ses })
  } else if (tipo === 'rodaje') {
    ses.push({ id: cid('s'), label: 'Colágeno 15g + zumo naranja', hint: '90 min antes · ~17:30h' })
    ses.push({ id: cid('s'), label: 'Rodaje 6 km Z1-Z2 · FC <150', hint: 'Primer rodaje post-resfriado · sin forzar' })
    ses.push({ id: cid('s'), label: 'Foam roller post-rodaje', hint: 'Gemelos + cuádriceps · 5-10 min' })
    s.push({ title: '🏃 Sesión de Rodaje Z1-Z2', items: ses })
  } else if (tipo === 'tirada') {
    ses.push({ id: cid('s'), label: 'Colágeno 15g + zumo naranja', hint: '90 min antes de salir · ~13:30h' })
    ses.push({ id: cid('s'), label: 'Tirada Z2 10-12 km · FC <155', hint: 'Sin forzar — recuperación post-resfriado' })
    ses.push({ id: cid('s'), label: 'Sales en bolsillo', hint: 'Tomar en km 3-4' })
    ses.push({ id: cid('s'), label: 'Foam roller completo post-tirada', hint: 'Gemelos · cuádriceps · isquios · 10-15 min' })
    s.push({ title: '🏔️ Tirada Larga', items: ses })
  }

  // COMIDAS
  if (dayPlan) {
    const meals = dayPlan.meals.map(meal => ({
      id: cid('c'),
      label: `${meal.time} · ${meal.name}`,
      hint:  `${meal.kcal} · ${meal.items.slice(0,3).map(i => i.name).join(', ')}`,
      mealLink: { mealId: meal.id, dayIdx: planIdx },
    }))
    s.push({ title: `🍽️ Comidas · ${dayPlan.kcal} kcal`, items: meals })

    if (dayPlan.supplements?.length) {
      s.push({
        title: '💊 Suplementos',
        items: dayPlan.supplements.map(sup => ({ id: cid('sup'), label: sup.name, hint: sup.when })),
      })
    }
  }

  // NOCHE
  const night = []
  if (tipo === 'rodaje' || tipo === 'tirada') {
    night.push({ id: cid('n'), label: 'Bisglicinato de magnesio en cena', hint: 'Recuperación muscular nocturna' })
  }
  const nextTipo = DIA_TIPO[(planIdx + 1) % 7]
  if (['fuerza','rodaje','tirada'].includes(nextTipo)) {
    night.push({ id: cid('n'), label: 'Preparar avena overnight para mañana', hint: 'Avena + leche soja · 5 min' })
    night.push({ id: cid('n'), label: 'Revisar sesión de mañana', hint: `${DIA_EMOJI[(planIdx+1)%7]} ${DIA_NOMBRE[(planIdx+1)%7]}` })
  }
  if (night.length) s.push({ title: '🌙 Esta noche', items: night })

  return s
}

const sections  = computed(() => buildSections())
const allIds    = computed(() => sections.value.flatMap(s => s.items.map(i => i.id)))
const totalCnt  = computed(() => allIds.value.length)
const doneCnt   = computed(() => allIds.value.filter(id => store.isChecked(id)).length)
const pct       = computed(() => totalCnt.value ? Math.round(doneCnt.value / totalCnt.value * 100) : 0)
const progLabel = computed(() => {
  if (pct.value === 100) return '✅ Día completado'
  if (pct.value >= 75)   return '💪 Casi lo tienes'
  if (pct.value >= 50)   return '🔥 Buen ritmo'
  if (pct.value >= 25)   return '🚀 Empezando'
  return 'Checklist del día'
})

function goToMeal({ mealId, dayIdx }) {
  router.push({ path: '/nutri', query: { dia: dayIdx, meal: mealId } })
}
</script>

<style scoped>
.cl-meal-btn {
  flex-shrink: 0; border: none; background: #f0f5f1; border-radius: 8px;
  padding: 6px 10px; font-size: 12px; font-weight: 600; color: #10A46A;
  cursor: pointer; min-width: 36px; min-height: 36px;
}
</style>
