<template>
  <div class="chart-wrap">
    <svg :viewBox="`0 0 ${W} ${H}`" class="chart-svg" preserveAspectRatio="none">
      <!-- línea objetivo -->
      <line
        :x1="0" :y1="yPos(70)" :x2="W" :y2="yPos(70)"
        stroke="#1565c0" stroke-width="1" stroke-dasharray="4 3" opacity=".5"
      />
      <!-- área relleno -->
      <path :d="areaPath" fill="url(#grad)" opacity=".25" />
      <!-- línea -->
      <path :d="linePath" fill="none" stroke="var(--green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <!-- punto actual -->
      <circle :cx="puntos[puntos.length-1]?.x" :cy="puntos[puntos.length-1]?.y" r="4" fill="var(--green)" />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--green)" />
          <stop offset="100%" stop-color="var(--green)" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
    <!-- eje Y -->
    <div class="y-axis">
      <span>{{ max }}</span>
      <span>{{ Math.round((max + min) / 2) }}</span>
      <span>{{ min }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  puntos: { type: Array, required: true },
  min:    { type: Number, required: true },
  max:    { type: Number, required: true },
})

const W = 300
const H = 100
const PAD = { t: 8, b: 8, l: 4, r: 4 }

function xPos(i) {
  return PAD.l + (i / (props.puntos.length - 1)) * (W - PAD.l - PAD.r)
}
function yPos(val) {
  return PAD.t + (1 - (val - props.min) / (props.max - props.min)) * (H - PAD.t - PAD.b)
}

const puntos = computed(() =>
  props.puntos.map((p, i) => ({ x: xPos(i), y: yPos(p.val) }))
)

const linePath = computed(() =>
  puntos.value.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
)

const areaPath = computed(() => {
  const pts = puntos.value
  if (!pts.length) return ''
  const base = H - PAD.b
  return [
    `M${pts[0].x.toFixed(1)},${base}`,
    ...pts.map(p => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`),
    `L${pts.at(-1).x.toFixed(1)},${base}`,
    'Z',
  ].join(' ')
})
</script>

<style scoped>
.chart-wrap { position: relative; padding-right: 28px; }
.chart-svg  { width: 100%; height: 100px; display: block; }
.y-axis {
  position: absolute; right: 0; top: 0; bottom: 0;
  display: flex; flex-direction: column; justify-content: space-between;
  font-size: 10px; color: var(--text-3); padding: 6px 0;
}
</style>
