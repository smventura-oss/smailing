<template>
  <div>
    <!-- HEADER -->
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">Seguimiento · Composición corporal</div>
      <div class="screen-title">📏 Medidas</div>
      <div class="screen-sub">Peso semanal · Medidas mensuales · Próxima: 1 abr</div>
    </header>

    <!-- GRÁFICA PESO -->
    <div class="chart-wrap" style="margin-top:12px;">
      <div class="chart-header">
        <div class="chart-ttl">Evolución del peso</div>
        <div class="chart-leg">
          <div class="cleg"><div class="cleg-line" style="background:#10A46A;height:3px"></div>Real</div>
          <div class="cleg"><div class="cleg-line" style="background:#e8a020;opacity:.9;border-top:2px dashed #e8a020;height:0"></div>Objetivo</div>
        </div>
      </div>
      <div style="display:flex;gap:4px;margin-bottom:12px;">
        <button class="peso-vtab" :class="{ 'peso-vtab-active': pesoVista === 'dia'  }" @click="pesoVista = 'dia'">Diario</button>
        <button class="peso-vtab" :class="{ 'peso-vtab-active': pesoVista === 'sem'  }" @click="pesoVista = 'sem'">Semanal</button>
        <button class="peso-vtab" :class="{ 'peso-vtab-active': pesoVista === 'mes'  }" @click="pesoVista = 'mes'">Mensual</button>
      </div>
      <div ref="chartEl" v-html="chartSVG" />
    </div>

    <!-- SUEÑO -->
    <div class="card-title">😴 Sueño · Historial</div>
    <div class="card" style="margin-top:12px;">
      <div style="padding:14px 20px 4px;display:flex;justify-content:space-between;align-items:baseline;">
        <div style="font-size:15px;font-weight:700;color:#111;">Viernes 6 mar</div>
        <div style="font-size:12px;color:#767676;">8h 34m total</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;padding:0 20px 4px;">
        <div style="padding:8px 0;border-bottom:1px solid #f2f2f0;">
          <div style="font-size:18px;font-weight:700;color:#111;">1h 47m</div>
          <div style="font-size:12px;color:#888;margin-top:2px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4A90D9;margin-right:4px;vertical-align:middle;"></span>Deep</div>
        </div>
        <div style="padding:8px 0 8px 16px;border-bottom:1px solid #f2f2f0;">
          <div style="font-size:18px;font-weight:700;color:#111;">5h 52m</div>
          <div style="font-size:12px;color:#888;margin-top:2px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#7EC8E3;margin-right:4px;vertical-align:middle;"></span>Light</div>
        </div>
        <div style="padding:8px 0 12px;">
          <div style="font-size:18px;font-weight:700;color:#111;">53m</div>
          <div style="font-size:12px;color:#888;margin-top:2px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#C080D0;margin-right:4px;vertical-align:middle;"></span>REM</div>
        </div>
        <div style="padding:8px 0 12px 16px;">
          <div style="font-size:18px;font-weight:700;color:#111;">22m</div>
          <div style="font-size:12px;color:#888;margin-top:2px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ddd;margin-right:4px;vertical-align:middle;"></span>Awake</div>
        </div>
      </div>
      <div style="border-top:1px solid #f2f2f0;padding:10px 20px 14px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <div class="row" style="padding:6px 0;border:none;font-size:13px;"><span style="color:#888;">FC media noche</span><span style="font-weight:600;">67 bpm</span></div>
        <div class="row" style="padding:6px 0;border:none;font-size:13px;"><span style="color:#888;">FC reposo</span><span style="font-weight:600;">59 bpm</span></div>
        <div class="row" style="padding:6px 0;border:none;font-size:13px;"><span style="color:#888;">SpO₂ media</span><span style="font-weight:600;">95%</span></div>
        <div class="row" style="padding:6px 0;border:none;font-size:13px;"><span style="color:#888;">SpO₂ mín.</span><span style="font-weight:600;color:#c0392b;">85%</span></div>
        <div class="row" style="padding:6px 0;border:none;font-size:13px;"><span style="color:#888;">HRV (7d avg)</span><span style="font-weight:600;color:#b8860b;">31ms · Unbalanced</span></div>
        <div class="row" style="padding:6px 0;border:none;font-size:13px;"><span style="color:#888;">Body Battery</span><span style="font-weight:600;color:#10A46A;">27</span></div>
      </div>
    </div>

    <!-- GARMIN -->
    <div class="card-title">⌚ Garmin · 6 mar 2026</div>
    <div class="card" style="margin-top:12px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid #f2f2f0;">
        <div style="padding:16px 18px 14px;border-right:1px solid #f2f2f0;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">Training Status</div>
          <div style="font-size:22px;font-weight:800;color:#111;letter-spacing:-.5px;">Strained</div>
          <div style="font-size:12px;color:#888;margin-top:4px;">Desde 11 mar</div>
        </div>
        <div style="padding:16px 18px 14px;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">VO₂ Max</div>
          <div style="font-size:32px;font-weight:800;color:#10A46A;letter-spacing:-1px;line-height:1;">45</div>
          <div style="font-size:12px;color:#888;margin-top:4px;">Good ✓</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid #f2f2f0;">
        <div style="padding:14px 18px 14px;border-right:1px solid #f2f2f0;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">HRV Status</div>
          <div style="font-size:22px;font-weight:800;color:#b8860b;letter-spacing:-.5px;">30 ms</div>
          <div style="font-size:12px;color:#b8860b;margin-top:4px;font-weight:600;">■ Low · 7d avg</div>
        </div>
        <div style="padding:14px 18px 14px;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">Body Battery</div>
          <div style="font-size:32px;font-weight:800;color:#10A46A;letter-spacing:-1px;line-height:1;">75</div>
          <div style="font-size:12px;color:#888;margin-top:4px;">Mañana del 6 mar</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid #f2f2f0;">
        <div style="padding:14px 18px 14px;border-right:1px solid #f2f2f0;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">Training Load</div>
          <div style="font-size:18px;font-weight:700;color:#111;">Low</div>
          <div style="font-size:12px;color:#888;margin-top:3px;">83/176 · ratio 0.4</div>
        </div>
        <div style="padding:14px 18px 14px;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">Fitness Age</div>
          <div style="font-size:32px;font-weight:800;color:#10A46A;letter-spacing:-1px;line-height:1;">39</div>
          <div style="font-size:12px;color:#888;margin-top:4px;">Edad real 40 · objetivo 34.5</div>
        </div>
      </div>
      <div style="padding:12px 18px 14px;">
        <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">Sleep Score</div>
        <div style="font-size:22px;font-weight:700;color:#767676;letter-spacing:-.5px;">39</div>
        <div style="font-size:11px;color:#767676;margin-top:2px;">5h49m noche 6→7 mar</div>
      </div>
    </div>

    <!-- MEDIDAS CORPORALES -->
    <div class="card-title">📐 Medidas corporales · 2 mar 2026</div>
    <div class="card" style="margin-top:12px;">
      <div v-for="m in medidas" :key="m.id" class="row row-link" @click="abrirSheet(m.id)">
        <span>{{ m.nombre }}</span>
        <span>
          <span v-if="m.alerta" class="tag amber">{{ m.valor }}<span class="row-arrow">›</span></span>
          <span v-else class="row-dim">{{ m.valor }}<span class="row-arrow">›</span></span>
        </span>
      </div>
    </div>

    <!-- INDICADORES CLAVE -->
    <div class="card-title">📊 Indicadores clave</div>
    <div class="card">
      <div v-for="ind in indicadores" :key="ind.id" class="row row-link" @click="abrirSheet(ind.id)">
        <span>{{ ind.nombre }}</span>
        <span>
          <span v-if="ind.alerta" class="tag amber">{{ ind.valor }}<span class="row-arrow">›</span></span>
          <span v-else class="row-dim">{{ ind.valor }}<span class="row-arrow">›</span></span>
        </span>
      </div>
    </div>

    <div class="note green" style="margin:0 16px 12px;">📅 Próxima medición: <strong>1 de abril 2026</strong>. Con el plan actual espera cintura −2/−3 cm y abdomen −2/−3 cm.</div>
    <div class="spacer" />

    <!-- BOTTOM SHEET -->
    <div class="bs-overlay" :class="{ open: sheetOpen }" @click.self="cerrarSheet">
      <div class="bs-sheet">
        <div class="bs-handle" />
        <div class="bs-head">
          <div class="bs-title">{{ sheetData?.label }}</div>
          <div class="bs-current">{{ sheetCurrentText }}</div>
        </div>
        <div class="bs-body" v-if="sheetData">
          <!-- Mini chart if ≥2 registros -->
          <div v-if="sheetData.registros?.length >= 2" class="bs-chart" v-html="miniChartSVG" />
          <!-- Historial -->
          <div class="bs-hist">
            <div v-for="(r, i) in [...(sheetData.registros || [])].reverse()" :key="i" class="bs-hist-row">
              <span class="bs-hist-date">{{ r.fecha }}</span>
              <span>
                <span class="bs-hist-val">{{ r.valor }} {{ sheetData.unidad }}</span>
                <span v-if="deltaFor(sheetData, sheetData.registros.length - 1 - i)" class="bs-hist-delta" :class="deltaCls(sheetData, sheetData.registros.length - 1 - i)">
                  {{ deltaFor(sheetData, sheetData.registros.length - 1 - i) }}
                </span>
              </span>
            </div>
          </div>
          <div v-if="sheetData.objetivoLabel" class="bs-objetivo" v-html="'🎯 ' + sheetData.objetivoLabel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useSemanaStore } from '@/stores/semana'

const semana = useSemanaStore()

// ── Header shrink ──
const shrunk  = ref(false)
let ticking   = false
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => { shrunk.value = window.scrollY > 30; ticking = false })
    ticking = true
  }
}
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// ── Peso chart ──
const pesoVista = ref('dia')
const chartEl   = ref(null)

const MESES_CORTOS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']

function pesoLabel(fecha) {
  const [,, d, m] = fecha.match(/(\d{4})-(\d{2})-(\d{2})/)
  return d.replace(/^0/,'') + '/' + m.replace(/^0/,'')
}

function aggregateWeekly(regs) {
  const map = {}
  regs.forEach(r => {
    const d = new Date(r.fecha)
    const day = d.getDay() || 7
    const mon = new Date(d)
    mon.setDate(d.getDate() - day + 1)
    const key = mon.toISOString().slice(0,10)
    if (!map[key]) map[key] = { sum: 0, count: 0, date: new Date(mon) }
    map[key].sum += r.peso; map[key].count++
  })
  return Object.keys(map).sort().map(k => {
    const m = map[k].date
    return { label: m.getDate() + ' ' + MESES_CORTOS[m.getMonth()], valor: Math.round(map[k].sum / map[k].count * 100) / 100 }
  })
}

function aggregateMonthly(regs) {
  const map = {}
  regs.forEach(r => {
    const d = new Date(r.fecha); const key = d.getFullYear() + '-' + d.getMonth()
    if (!map[key]) map[key] = { sum: 0, count: 0, m: d.getMonth() }
    map[key].sum += r.peso; map[key].count++
  })
  return Object.keys(map).sort().map(k => {
    const e = map[k]
    return { label: MESES_CORTOS[e.m], valor: Math.round(e.sum / e.count * 100) / 100 }
  })
}

const chartSVG = computed(() => {
  const W = 320, H = 220, PL = 44, PR = 20, PT = 16, PB = 38
  const cW = W - PL - PR, cH = H - PT - PB
  const OBJ = 70.0
  const MESES_PROJ = ['Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar']
  const regs = semana.pesoRegistros

  let realPts
  if (pesoVista.value === 'dia') {
    realPts = regs.map(r => ({ label: pesoLabel(r.fecha), valor: r.peso }))
  } else if (pesoVista.value === 'sem') {
    realPts = aggregateWeekly(regs)
  } else {
    realPts = aggregateMonthly(regs)
  }

  const n = realPts.length
  const lastVal = realPts[n-1].valor
  const projPts = MESES_PROJ.map((l, i) => ({
    label: l,
    valor: Math.round((lastVal - (lastVal - OBJ) * (i+1) / MESES_PROJ.length) * 100) / 100
  }))

  const allPts = realPts.concat(projPts)
  const total  = allPts.length
  const allVals = allPts.map(p => p.valor)
  const yMn = Math.floor(Math.min(...allVals, OBJ) - 0.5)
  const yMx = Math.ceil(Math.max(...allVals) + 0.5)

  const xp = i => PL + (i / Math.max(total-1, 1)) * cW
  const yp = v => PT + cH - ((v - yMn) / (yMx - yMn)) * cH

  let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" style="font-family:DM Sans,sans-serif;display:block;">`

  // Grid Y
  const step = (yMx - yMn) <= 5 ? 1 : 2
  for (let gv = yMn; gv <= yMx; gv += step) {
    const gy = yp(gv); const isObj = gv === OBJ
    s += `<line x1="${PL}" y1="${gy}" x2="${W-PR}" y2="${gy}" stroke="${isObj?'#e8a020':'#ece8e2'}" stroke-width="${isObj?'1.5':'1'}" ${isObj?'stroke-dasharray="5,3"':''}/>`
    s += `<text x="${PL-6}" y="${gy+4}" text-anchor="end" font-size="11" font-weight="${isObj?'600':'400'}" fill="${isObj?'#b87800':'#aaa'}">${gv}</text>`
  }

  // Separator
  s += `<line x1="${xp(n-1)}" y1="${PT}" x2="${xp(n-1)}" y2="${PT+cH}" stroke="#ddd" stroke-width="1" stroke-dasharray="3,3"/>`

  // Area fill
  const rSeg = realPts.map((p,i) => `${xp(i)},${yp(p.valor)}`)
  s += `<path d="M${xp(0)},${PT+cH} L${rSeg.join(' L')} L${xp(n-1)},${PT+cH} Z" fill="rgba(30,77,43,0.07)"/>`
  s += `<polyline points="${rSeg.join(' ')}" fill="none" stroke="#10A46A" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`

  // Dots
  realPts.forEach((p, i) => {
    const isLast = i === n-1
    if (!isLast && n > 8) return
    s += `<circle cx="${xp(i)}" cy="${yp(p.valor)}" r="${isLast?5:3}" fill="${isLast?'#10A46A':'#fff'}" stroke="#10A46A" stroke-width="2"/>`
    if (isLast) s += `<text x="${xp(i)}" y="${yp(p.valor)-9}" text-anchor="middle" font-size="11" font-weight="700" fill="#10A46A">${p.valor}</text>`
  })

  // Projection line
  const pSeg = [`${xp(n-1)},${yp(lastVal)}`].concat(projPts.map((p,i) => `${xp(n+i)},${yp(p.valor)}`))
  s += `<polyline points="${pSeg.join(' ')}" fill="none" stroke="#10A46A" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.4"/>`

  // OBJ label
  s += `<text x="${W-PR-2}" y="${yp(OBJ)-5}" text-anchor="end" font-size="10" font-weight="700" fill="#b87800">OBJ 70</text>`

  // X labels
  allPts.forEach((p, i) => {
    const isReal = i < n, isFirst = i === 0, isLast = i === n-1
    const showReal = isFirst || isLast || n <= 8 || i % Math.ceil(n/5) === 0
    const showProj = i >= n && ((i-n) % 2 === 0 || i === total-1)
    if (!showReal && !showProj) return
    const anchor = i === 0 ? 'start' : i === total-1 ? 'end' : 'middle'
    s += `<text x="${xp(i)}" y="${H-8}" text-anchor="${anchor}" font-size="10" fill="${isReal?'#888':'#bbb'}">${p.label}</text>`
  })

  s += '</svg>'
  return s
})

// ── Medidas ──
const medidas = [
  { id:'peso',     nombre:'Peso',     valor:'80.60 kg · 7 mar', alerta:false },
  { id:'cintura',  nombre:'Cintura',  valor:'89 cm ⚠️',         alerta:true  },
  { id:'abdomen',  nombre:'Abdomen',  valor:'96 cm ⚠️',         alerta:true  },
  { id:'cadera',   nombre:'Cadera',   valor:'94 cm',            alerta:false },
  { id:'pecho',    nombre:'Pecho',    valor:'99 cm',            alerta:false },
  { id:'hombros',  nombre:'Hombros',  valor:'117 cm',           alerta:false },
  { id:'brazo',    nombre:'Brazo',    valor:'35.5 cm',          alerta:false },
  { id:'muslo',    nombre:'Muslo',    valor:'67.5 cm',          alerta:false },
  { id:'gemelo',   nombre:'Gemelo',   valor:'39 cm',            alerta:false },
  { id:'cuello',   nombre:'Cuello',   valor:'38 cm',            alerta:false },
]
const indicadores = [
  { id:'ratio',  nombre:'Ratio cintura/cadera',    valor:'0.95', alerta:true  },
  { id:'grasa',  nombre:'Grasa corporal estimada', valor:'~22-24%',alerta:false},
  { id:'peso',   nombre:'Peso objetivo maratón',   valor:'70 kg · −9.5 kg',alerta:false},
  { id:'cintura',nombre:'Cintura objetivo',        valor:'~82 cm · −7 cm', alerta:false},
]

// ── Bottom sheet ──
const sheetOpen = ref(false)
const sheetKey  = ref(null)

const MEDIDAS_DATA = {
  peso: {
    label: 'Peso corporal', unidad: 'kg', objetivo: 70,
    objetivoLabel: 'Objetivo maratón: <strong>70 kg</strong> · faltan −10.25 kg · diciembre 2026',
    registros: semana.pesoRegistros.map(r => {
      const d = new Date(r.fecha)
      return { fecha: d.getDate() + ' ' + MESES_CORTOS[d.getMonth()], valor: r.peso }
    }),
    alza: true,
  },
  cintura:  { label:'Cintura', unidad:'cm', objetivo:82, objetivoLabel:'Objetivo: <strong>~82 cm</strong> · faltan −7 cm', registros:[{fecha:'2 mar',valor:89}], alza:true },
  abdomen:  { label:'Abdomen', unidad:'cm', objetivo:null, objetivoLabel:'Objetivo: reducir con el déficit calórico', registros:[{fecha:'2 mar',valor:96}], alza:true },
  cadera:   { label:'Cadera', unidad:'cm', objetivo:null, objetivoLabel:'Referencia anatómica · próxima medición 1 abr', registros:[{fecha:'2 mar',valor:94}], alza:false },
  pecho:    { label:'Pecho', unidad:'cm', objetivo:null, objetivoLabel:'Referencia muscular', registros:[{fecha:'2 mar',valor:99}], alza:false },
  hombros:  { label:'Hombros', unidad:'cm', objetivo:null, objetivoLabel:'Referencia muscular', registros:[{fecha:'2 mar',valor:117}], alza:false },
  brazo:    { label:'Brazo', unidad:'cm', objetivo:null, objetivoLabel:'Referencia muscular', registros:[{fecha:'2 mar',valor:35.5}], alza:false },
  muslo:    { label:'Muslo', unidad:'cm', objetivo:null, objetivoLabel:'Referencia muscular', registros:[{fecha:'2 mar',valor:67.5}], alza:false },
  gemelo:   { label:'Gemelo', unidad:'cm', objetivo:null, objetivoLabel:'Referencia muscular', registros:[{fecha:'2 mar',valor:39}], alza:false },
  cuello:   { label:'Cuello', unidad:'cm', objetivo:null, objetivoLabel:'Referencia', registros:[{fecha:'2 mar',valor:38}], alza:false },
  ratio:    { label:'Ratio cintura/cadera', unidad:'', objetivo:0.90, objetivoLabel:'Objetivo: <strong>&lt;0.90</strong> (riesgo cardiovascular bajo) · actual 0.95', registros:[{fecha:'2 mar',valor:0.95}], alza:true },
  grasa:    { label:'Grasa corporal (Navy)', unidad:'%', objetivo:15, objetivoLabel:'Objetivo: <strong>~15%</strong> para maratón', registros:[{fecha:'2 mar',valor:23}], alza:true },
}

const sheetData = computed(() => sheetKey.value ? MEDIDAS_DATA[sheetKey.value] : null)
const sheetCurrentText = computed(() => {
  if (!sheetData.value) return ''
  const r = sheetData.value.registros
  const last = r[r.length - 1]
  return `Actual: ${last.valor} ${sheetData.value.unidad} · ${last.fecha}`
})

function abrirSheet(key) {
  sheetKey.value = key
  sheetOpen.value = true
  document.body.style.overflow = 'hidden'
}
function cerrarSheet() {
  sheetOpen.value = false
  document.body.style.overflow = ''
}

function deltaFor(d, i) {
  if (i <= 0) return null
  const diff = d.registros[i].valor - d.registros[i-1].valor
  if (diff === 0) return '='
  return (diff > 0 ? '+' : '') + diff.toFixed(2).replace(/\.?0+$/, '') + ' ' + d.unidad
}
function deltaCls(d, i) {
  if (i <= 0) return 'delta-eq'
  const diff = d.registros[i].valor - d.registros[i-1].valor
  if (diff === 0) return 'delta-eq'
  return d.alza ? (diff > 0 ? 'delta-up' : 'delta-dn') : (diff > 0 ? 'delta-dn' : 'delta-up')
}

// Mini chart for bottom sheet
const miniChartSVG = computed(() => {
  if (!sheetData.value || sheetData.value.registros.length < 2) return ''
  const regs = sheetData.value.registros
  const vals = regs.map(r => r.valor)
  const obj  = sheetData.value.objetivo
  let mn = Math.min(...vals), mx = Math.max(...vals)
  if (obj != null) { mn = Math.min(mn, obj); mx = Math.max(mx, obj) }
  const pad = (mx - mn) * 0.15 || 0.5
  mn -= pad; mx += pad
  const W = 320, H = 100, pl = 8, pr = 8, pt = 10, pb = 24
  const iw = W-pl-pr, ih = H-pt-pb
  const px = i => pl + i * (iw / (regs.length-1))
  const py = v => pt + ih - (v - mn) / (mx - mn) * ih

  const pts = regs.map((r,i) => `${px(i)},${py(r.valor)}`).join('L')
  const area = `M${px(0)},${py(regs[0].valor)}L${pts.slice(pts.indexOf('L')+1)}L${px(regs.length-1)},${pt+ih}L${px(0)},${pt+ih}Z`

  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:90px;width:100%;">`
  s += `<defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#10A46A" stop-opacity=".15"/><stop offset="100%" stop-color="#10A46A" stop-opacity="0"/></linearGradient></defs>`
  s += `<path d="M${px(0)},${py(regs[0].valor)}L${pts}" fill="none" stroke="#10A46A" stroke-width="2.5"/>`
  if (obj != null) {
    s += `<line x1="${pl}" y1="${py(obj)}" x2="${W-pr}" y2="${py(obj)}" stroke="#10A46A" stroke-width="1.5" stroke-dasharray="4,3" opacity=".5"/>`
  }
  s += `<circle cx="${px(regs.length-1)}" cy="${py(vals[vals.length-1])}" r="4" fill="#10A46A"/>`
  // X labels
  ;[0, Math.floor(regs.length/2), regs.length-1].forEach(i => {
    s += `<text x="${px(i)}" y="${H-4}" font-size="9" fill="#bbb" text-anchor="middle">${regs[i].fecha}</text>`
  })
  s += '</svg>'
  return s
})
</script>
