<template>
  <div class="bs-overlay" :class="{ open }" @click.self="$emit('close')">
    <div class="bs-sheet" ref="sheet">
      <div class="bs-handle" />
      <div class="bs-head">
        <div class="bs-title">{{ data?.label }}</div>
        <div class="bs-current">Actual: {{ last?.valor }} {{ data?.unidad }} · {{ last?.fecha }}</div>
      </div>
      <div class="bs-body">
        <!-- Mini chart (only when ≥2 data points) -->
        <div v-if="data?.registros?.length >= 2" class="bs-chart" v-html="miniChartSvg" />
        <!-- History rows -->
        <div v-for="(r, i) in [...(data?.registros ?? [])].reverse()" :key="i" class="bs-hist-row">
          <span class="bs-hist-date">{{ r.fecha }}</span>
          <span>
            <span class="bs-hist-val">{{ r.valor }} {{ data?.unidad }}</span>
            <span v-if="delta(i)" class="bs-hist-delta" :class="deltaClass(i)">{{ delta(i) }}</span>
          </span>
        </div>
        <!-- Objetivo -->
        <div v-if="data?.objetivoLabel" class="bs-objetivo">
          🎯 <span v-html="data.objetivoLabel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props  = defineProps({ open: Boolean, data: Object })
const emit   = defineEmits(['close'])
const sheet  = ref(null)

const regs = computed(() => props.data?.registros ?? [])
const last = computed(() => regs.value[regs.value.length - 1])

// reversed list for display
const reversed = computed(() => [...regs.value].reverse())

function delta(reversedIdx) {
  // reversedIdx=0 is the latest; original index = regs.length - 1 - reversedIdx
  const origIdx = regs.value.length - 1 - reversedIdx
  if (origIdx === 0) return null
  const diff = regs.value[origIdx].valor - regs.value[origIdx - 1].valor
  if (diff === 0) return '='
  return (diff > 0 ? '+' : '') + diff.toFixed(2).replace(/\.?0+$/, '') + ' ' + (props.data?.unidad ?? '')
}

function deltaClass(reversedIdx) {
  const origIdx = regs.value.length - 1 - reversedIdx
  if (origIdx === 0) return ''
  const diff = regs.value[origIdx].valor - regs.value[origIdx - 1].valor
  if (diff === 0) return 'delta-eq'
  const alza = props.data?.alza ?? true
  return diff > 0 ? (alza ? 'delta-up' : 'delta-dn') : (alza ? 'delta-dn' : 'delta-up')
}

// Mini SVG chart
const miniChartSvg = computed(() => {
  const data = props.data
  if (!data || data.registros.length < 2) return ''
  const regs = data.registros
  const vals = regs.map(r => r.valor)
  let mn = Math.min(...vals), mx = Math.max(...vals)
  if (data.objetivo != null) { mn = Math.min(mn, data.objetivo); mx = Math.max(mx, data.objetivo) }
  const pad = (mx - mn) * 0.15 || 0.5; mn -= pad; mx += pad
  const W = 320, H = 100, pl = 8, pr = 8, pt = 10, pb = 24
  const iw = W - pl - pr, ih = H - pt - pb
  const px = i => pl + i * (iw / (regs.length - 1))
  const py = v => pt + ih - (v - mn) / (mx - mn) * ih

  const pts  = regs.map((r, i) => `${px(i)},${py(r.valor)}`).join(' ')
  const area = `M${px(0)},${py(regs[0].valor)} ${pts.split(' ').slice(1).map(p => `L${p}`).join(' ')} L${px(regs.length-1)},${pt+ih} L${px(0)},${pt+ih}Z`

  let objLine = ''
  if (data.objetivo != null) {
    const oy = py(data.objetivo)
    objLine = `<line x1="${pl}" y1="${oy}" x2="${W-pr}" y2="${oy}" stroke="#10A46A" stroke-width="1.5" stroke-dasharray="4,3" opacity=".5"/>`
  }

  let labels = ''
  for (const idx of [0, Math.floor(regs.length/2), regs.length-1]) {
    labels += `<text x="${px(idx)}" y="${H-4}" font-size="9" fill="#bbb" text-anchor="middle">${regs[idx].fecha}</text>`
  }

  const lx = px(regs.length-1), ly = py(vals[vals.length-1])
  return `<div style="padding:16px 20px 8px"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:90px;width:100%;"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#10A46A" stop-opacity=".15"/><stop offset="100%" stop-color="#10A46A" stop-opacity="0"/></linearGradient></defs><path d="${area}" fill="url(#cg)"/><polyline points="${pts}" fill="none" stroke="#10A46A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${objLine}<circle cx="${lx}" cy="${ly}" r="4" fill="#10A46A"/>${labels}</svg></div>`
})

// Swipe to close
let startY = 0
watch(() => props.open, (v) => {
  if (!v || !sheet.value) return
  sheet.value.addEventListener('touchstart', e => { startY = e.touches[0].clientY }, { passive: true })
  sheet.value.addEventListener('touchend',   e => {
    if (e.changedTouches[0].clientY - startY > 60) emit('close')
  }, { passive: true })
})
</script>
