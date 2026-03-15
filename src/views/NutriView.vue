<template>
  <div>
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-title">🍽️ Nutrición</div>
      <div class="screen-sub">Objetivo déficit −300 kcal/día · Semana 3</div>
    </header>

    <!-- Day strip -->
    <div class="day-strip">
      <div
        v-for="(chip, i) in DAY_CHIPS"
        :key="i"
        class="chip"
        :class="{ active: activeDay === i, past: i < todayPlanIdx }"
        @click="setDay(i)"
      >
        <div class="chip-day">{{ chip.day }}</div>
        <div class="chip-num">{{ weekDates[i] }}</div>
        <div class="chip-tag" :class="chip.tagCls">{{ chip.tagLabel }}</div>
      </div>
    </div>

    <!-- Day panels -->
    <div class="day-panels">
      <template v-if="day">
        <!-- KCal bar -->
        <div class="kcal-bar">
          <div>
            <div class="train-badge" :class="day.badge.cls">{{ day.badge.text }}</div>
            <div v-if="day.badgeExtra" class="train-badge" :style="day.badgeExtra.style">{{ day.badgeExtra.text }}</div>
          </div>
          <div v-if="day.warningNote" class="day-warning" v-html="day.warningNote" />
          <div>
            <div class="kcal-val">{{ day.kcal }}</div>
            <div class="kcal-sub">{{ day.deficit }}</div>
          </div>
          <div class="macro-row">
            <div v-for="m in day.macros" :key="m.lbl" class="macro">
              <span class="mval">{{ m.val }}</span>
              <span class="mlbl">{{ m.lbl }}</span>
            </div>
          </div>
        </div>

        <!-- Meals -->
        <MealCard v-for="meal in day.meals" :key="meal.id" :meal="meal" />

        <!-- Supplements -->
        <div v-if="day.supplements?.length" class="suppl">
          <div class="suppl-title">💊 Suplementación</div>
          <div v-for="s in day.supplements" :key="s.name" class="suppl-row">
            <span>{{ s.name }}</span>
            <span class="suppl-when">{{ s.when }}</span>
          </div>
        </div>

        <!-- Notes -->
        <div v-for="note in day.notes" :key="note.text" class="note" :class="note.cls">{{ note.text }}</div>
      </template>
    </div>

    <!-- Despensa button -->
    <div style="margin:4px 16px 16px;text-align:center;">
      <button class="btn-despensa" @click="despOpen = true">🥫 Ver despensa completa</button>
    </div>

    <DespensaModal :open="despOpen" @close="despOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShrinkHeader } from '@/composables/useShrinkHeader'
import { useAppStore } from '@/stores/useAppStore'
import MealCard from '@/components/nutri/MealCard.vue'
import DespensaModal from '@/components/nutri/DespensaModal.vue'

const { shrunk }  = useShrinkHeader()
const store       = useAppStore()
const { weekPlan: WEEK_PLAN, dayChips: DAY_CHIPS } = store
const route       = useRoute()
const despOpen    = ref(false)

// ── Week dates ────────────────────────────────────────
const today  = new Date()
const jsDay  = today.getDay()
const diffToMon = jsDay === 0 ? -6 : 1 - jsDay
const monday = new Date(today)
monday.setDate(today.getDate() + diffToMon)

const weekDates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(monday)
  d.setDate(monday.getDate() + i)
  return d.getDate()
})

// today's plan index (Mon=0…Sun=6)
const todayPlanIdx = [6,0,1,2,3,4,5][jsDay]

const activeDay = ref(todayPlanIdx)
const day = computed(() => WEEK_PLAN[activeDay.value])

function setDay(i) {
  activeDay.value = i
  // scroll to top of panel
  window.scrollTo({ top: 0, behavior: 'instant' })
}

// Handle deep-link from HoyView (query: ?dia=N&meal=ID)
onMounted(() => {
  const dia = Number(route.query.dia)
  if (!isNaN(dia) && dia >= 0 && dia < 7) activeDay.value = dia
  if (route.query.meal) {
    setTimeout(() => {
      const el = document.getElementById(route.query.meal)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
})
</script>

<style scoped>
.day-warning {
  background: #fff3e0; border-left: 4px solid #ef6c00;
  border-radius: 8px; padding: 10px 14px; font-size: 12px; color: #bf360c;
  margin: 0 0 8px; line-height: 1.5;
}
.btn-despensa {
  background: none; border: 1px solid #e0e0dc; border-radius: 8px;
  padding: 10px 20px; font-size: 13px; color: #767676; cursor: pointer;
  width: 100%; font-weight: 500;
}
</style>
