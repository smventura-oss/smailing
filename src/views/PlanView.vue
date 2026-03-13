<template>
  <div>
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">Plan · 54 semanas · Fase 1 · Sem 3</div>
      <div class="screen-title">🏃 Maratón BCN 2027</div>
      <div class="screen-sub">Semana 3 de 16 · 9–15 mar · Base Aeróbica</div>
    </header>

    <!-- Tabs -->
    <div class="plan-tabs">
      <div
        v-for="tab in TABS"
        :key="tab.id"
        class="plan-tab"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >{{ tab.label }}</div>
    </div>

    <!-- ── ESTA SEMANA ── -->
    <div v-if="activeTab === 'semana'" class="plan-panel active">
      <div class="alert-green" v-html="W.alert" />
      <div class="alert-warning" v-html="W.warning" />

      <!-- Stats row -->
      <div class="week-stats">
        <div v-for="s in W.stats" :key="s.lbl" class="week-stat">
          <div class="ws-val" :style="{ color: s.color }">{{ s.val }}</div>
          <div class="ws-lbl">{{ s.lbl }}</div>
        </div>
      </div>

      <!-- Schedule table -->
      <div class="week-table-wrap">
        <table class="wtable">
          <tr><th>Día</th><th>Sesión</th><th>km</th></tr>
          <tr
            v-for="row in W.rows"
            :key="row.day"
            :style="row.done ? 'background:#f0faf4;' : row.today ? 'background:#fff8f0;' : ''"
          >
            <td class="wday">{{ row.day }}</td>
            <td :class="{ wrest: row.rest }">
              {{ row.session }}
              <span v-if="row.badge" class="row-badge" :style="row.badge.style">{{ row.badge.text }}</span>
              <span v-if="row.today" class="row-badge" style="background:#fdf0d5;color:#7a4f00;">HOY</span>
            </td>
            <td class="wkm">{{ row.km }}</td>
          </tr>
        </table>
      </div>

      <!-- Fuerza detail -->
      <div class="section-title">💪 Sesiones de fuerza — detalle</div>
      <FuerzaDetail :data="W.fuerzaA" />
      <FuerzaDetail :data="W.fuerzaB" />
    </div>

    <!-- ── CARRERAS ── -->
    <div v-if="activeTab === 'carreras'" class="plan-panel active">
      <RaceCard v-for="race in RACES" :key="race.id" :race="race" />
    </div>

    <!-- ── FASES ── -->
    <div v-if="activeTab === 'fases'" class="plan-panel active">
      <PhaseCard v-for="phase in PHASES" :key="phase.id" :phase="phase" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useShrinkHeader } from '@/composables/useShrinkHeader'
import { RACES, PHASES, CURRENT_WEEK as W } from '@/data/plan'
import RaceCard   from '@/components/plan/RaceCard.vue'
import PhaseCard  from '@/components/plan/PhaseCard.vue'
import FuerzaDetail from '@/components/plan/FuerzaDetail.vue'

const { shrunk }   = useShrinkHeader()
const activeTab    = ref('semana')

const TABS = [
  { id: 'semana',   label: 'Esta semana' },
  { id: 'carreras', label: 'Carreras'    },
  { id: 'fases',    label: 'Fases'       },
]
</script>

<style scoped>
.alert-green  { background: var(--md-success-container); border-left: 4px solid var(--md-success); border-radius: 8px; padding: 8px 12px; margin-bottom: 16px; font-size: 12px; color: var(--md-success); font-weight: 700; }
.alert-warning { background: #fff3e0; border-left: 4px solid #ef6c00; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #bf360c; line-height: 1.6; }
.week-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 16px; }
.week-stat  { background: var(--md-surface); border: 1px solid var(--md-outline-variant); border-radius: 12px; padding: 12px; text-align: center; }
.ws-val { font-size: 20px; font-weight: 800; }
.ws-lbl { font-size: 10px; color: #888; margin-top: 2px; }
.week-table-wrap { background: var(--md-surface); border-radius: 12px; border: 1px solid var(--md-outline-variant); overflow: hidden; margin-bottom: 16px; }
.row-badge { font-size: 10px; padding: 2px 6px; border-radius: 10px; margin-left: 4px; }
.section-title { font-size: 13px; font-weight: 700; color: #333; margin-bottom: 8px; }
</style>
