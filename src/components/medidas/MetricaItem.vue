<template>
  <div class="metrica">
    <div class="met-val">{{ metrica.val }}<small>{{ metrica.unit }}</small></div>
    <div class="met-label">{{ metrica.label }}</div>
    <div class="met-diff" :class="diffClass">{{ arrow }}{{ metrica.diff }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ metrica: { type: Object, required: true } })

const diffClass = computed(() => ({
  'diff-down': props.metrica.trend === 'down',
  'diff-up':   props.metrica.trend === 'up',
  'diff-flat': props.metrica.trend === 'flat',
}))

const GOOD_DOWN = ['Grasa', 'IMC', 'Cintura', 'Cadera']
const isGood = computed(() => {
  if (props.metrica.trend === 'flat') return null
  const goodDown = GOOD_DOWN.includes(props.metrica.label)
  return goodDown ? props.metrica.trend === 'down' : props.metrica.trend === 'up'
})

const arrow = computed(() => props.metrica.trend === 'flat' ? '' : props.metrica.trend === 'up' ? '↑ ' : '↓ ')
</script>

<style scoped>
.metrica    { background: var(--bg); border-radius: 10px; padding: 10px; }
.met-val    { font-size: 20px; font-weight: 800; color: var(--text); line-height: 1; }
.met-val small { font-size: 12px; font-weight: 500; color: var(--text-3); }
.met-label  { font-size: 11px; color: var(--text-3); margin-top: 2px; }
.met-diff   { font-size: 11px; font-weight: 700; margin-top: 4px; }
.diff-down  { color: var(--green); }
.diff-up    { color: #1565c0; }
.diff-flat  { color: var(--text-3); }
</style>
