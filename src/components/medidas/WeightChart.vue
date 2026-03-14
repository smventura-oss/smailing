<template>
  <div ref="el" style="width:100%;" v-html="svg" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useAppStore } from '@/stores/useAppStore'

const props = defineProps({ view: { type: String, default: 'dia' } })
const store = useAppStore()
const el    = ref(null)
const width = ref(320)
const OBJ   = 70.0

const MESES      = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const MESES_PROJ = ['Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

function aggregateWeekly(registros) {
  const map = {}
  registros.forEach(r => {
    const d   = new Date(r.fecha)
    const day = d.getDay() || 7
    const mon = new Date(d)
    mon.setDate(d.getDate() - day + 1)
    const key = mon.toISOString().slice(0, 10)
    if (!map[key]) map[key] = { sum: 0, count: 0, date: mon }
    map[key].sum += r.peso; map[key].count++
  })
  return Object.keys(map).sort().map(k => {
    const m = map[k].date
    return { label: `${m.getDate()} ${MESES[m.getMonth()]}`, valor: Math.round(map[k].sum / map[k].count * 100) / 100 }
  })
}

function aggregateMonthly(registros) {
  const map = {}
  registros.forEach(r => {
    const d   = new Date(r.fecha)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!map[key]) map[key] = { sum: 0, count: 0, m: d.getMonth() }
    map[key].sum += r.peso; map[key].count++
  })
  return Object.keys(map).sort().map(k => {
    const e = map[k]
    return { label: MESES[e.m], valor: Math.round(e.sum / e.count * 100) / 100 }
  })
}

const svg = computed(() => {
  const W  = Math.max(width.value, 260)
  const H  = 220, PL = 44, PR = 20, PT = 16, PB = 38
  const cW = W - PL - PR, cH = H - PT - PB

  const registros = store.pesoRegistros
  let realPts
  if (props.view === 'dia') {
    realPts = registros.map(r => {
      const p = r.fecha.split('-')
      return { label: `${p[2]}/${p[1].replace(/^0/, '')}`, valor: r.peso }
    })
  } else if (props.view === 'sem') {
    realPts = aggregateWeekly(registros)
  } else {
    realPts = aggregateMonthly(registros)
  }

  const n       = realPts.length
  const lastVal = realPts[n - 1].valor
  const projPts = MESES_PROJ.map((m, i) => ({
    label: m,
    valor: Math.round((lastVal - (lastVal - OBJ) * (i + 1) / MESES_PROJ.length) * 100) / 100,
  }))
  const allPts  = [...realPts, ...projPts]
  const total   = allPts.length
  const allVals = [...realPts, ...projPts].map(p => p.valor)

  const yMn = Math.floor(Math.min(...allVals, OBJ) - 0.5)
  const yMx = Math.ceil(Math.max(...allVals) + 0.5)

  const xp = i  => PL + (i / Math.max(total - 1, 1)) * cW
  const yp = v  => PT + cH - ((v - yMn) / (yMx - yMn)) * cH

  let out = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" style="font-family:'DM Sans',sans-serif;display:block;">`

  // Grid lines
  const step = (yMx - yMn) <= 5 ? 1 : 2
  for (let gv = yMn; gv <= yMx; gv += step) {
    const gy   = yp(gv)
    const isObj = gv === OBJ
    out += `<line x1="${PL}" y1="${gy}" x2="${W - PR}" y2="${gy}" stroke="${isObj ? '#e8a020' : '#ece8e2'}" stroke-width="${isObj ? 1.5 : 1}" ${isObj ? 'stroke-dasharray="5,3"' : ''}/>`
    out += `<text x="${PL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" font-weight="${isObj ? 600 : 400}" fill="${isObj ? '#b87800' : '#aaa'}">${gv}</text>`
  }

  // Separator line
  const sepX = xp(n - 1)
  out += `<line x1="${sepX}" y1="${PT}" x2="${sepX}" y2="${PT + cH}" stroke="#ddd" stroke-width="1" stroke-dasharray="3,3"/>`

  // Area fill
  const rSeg = realPts.map((p, i) => `${xp(i)},${yp(p.valor)}`).join(' ')
  out += `<path d="M${xp(0)},${PT + cH} L${rSeg} L${xp(n - 1)},${PT + cH} Z" fill="rgba(30,77,43,0.07)"/>`
  out += `<polyline points="${rSeg}" fill="none" stroke="#10A46A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`

  // Key points
  const rVals  = realPts.map(p => p.valor)
  const minIdx = rVals.indexOf(Math.min(...rVals))
  const maxIdx = rVals.indexOf(Math.max(...rVals))
  realPts.forEach((p, i) => {
    const isLast = i === n - 1
    const isKey  = i === 0 || isLast || i === minIdx || i === maxIdx || n <= 8
    if (!isKey && props.view !== 'mes') return
    out += `<circle cx="${xp(i)}" cy="${yp(p.valor)}" r="${isLast ? 5 : 3}" fill="${isLast ? '#10A46A' : '#fff'}" stroke="#10A46A" stroke-width="2"/>`
    if (isLast || n <= 4) out += `<text x="${xp(i)}" y="${yp(p.valor) - 9}" text-anchor="middle" font-size="11" font-weight="700" fill="#10A46A">${p.valor}</text>`
  })

  // Projection line
  const pSeg = [`${xp(n - 1)},${yp(lastVal)}`, ...projPts.map((p, i) => `${xp(n + i)},${yp(p.valor)}`)].join(' ')
  out += `<polyline points="${pSeg}" fill="none" stroke="#10A46A" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.4"/>`
  out += `<text x="${W - PR - 2}" y="${yp(OBJ) - 5}" text-anchor="end" font-size="10" font-weight="700" fill="#b87800">OBJ 70</text>`

  // X labels
  allPts.forEach((p, i) => {
    const isReal = i < n
    const showReal = i === 0 || i === n - 1 || n <= 8 || i % Math.ceil(n / 5) === 0
    const showProj = i >= n && ((i - n) % 2 === 0 || i === total - 1)
    if (!showReal && !showProj) return
    const anchor = i === 0 ? 'start' : i === total - 1 ? 'end' : 'middle'
    out += `<text x="${xp(i)}" y="${H - 8}" text-anchor="${anchor}" font-size="10" fill="${isReal ? '#888' : '#bbb'}">${p.label}</text>`
  })

  out += '</svg>'
  return out
})

function measure() {
  if (el.value) width.value = el.value.clientWidth || el.value.parentElement?.clientWidth || 320
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
})
onUnmounted(() => window.removeEventListener('resize', measure))
watch(() => props.view, measure)
</script>
