<template>
  <div class="phase-card" :class="[phase.cls, { open: isOpen }]">
    <div class="phase-head" @click="isOpen = !isOpen">
      <div>
        <div class="phase-num">{{ phase.num }}</div>
        <div class="phase-name">{{ phase.name }}</div>
        <div class="phase-dates">{{ phase.dates }}</div>
      </div>
      <div class="phase-arrow">▾</div>
    </div>
    <div class="phase-body">
      <div class="phase-stats">
        <div v-for="s in phase.stats" :key="s.lbl" class="phase-stat">
          <div class="ps-val" :style="{ color: s.color }">{{ s.val }}</div>
          <div class="ps-lbl">{{ s.lbl }}</div>
        </div>
      </div>
      <template v-for="table in phase.tables" :key="table.title">
        <div class="wtable-title">
          {{ table.title }}
          <span v-if="table.titleBadge" class="change-badge">✦ Nuevo</span>
        </div>
        <table class="wtable">
          <tr><th>Día</th><th>Sesión</th><th>km</th></tr>
          <tr
            v-for="row in table.rows"
            :key="row.day"
            :class="{ 'new-session': row.highlight }"
          >
            <td class="wday">{{ row.day }}</td>
            <td :class="{ wrest: row.rest }">{{ row.session }}</td>
            <td class="wkm">{{ row.km }}</td>
          </tr>
        </table>
      </template>
      <div style="height:8px" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ phase: Object })
const isOpen = ref(props.phase.open)
</script>
