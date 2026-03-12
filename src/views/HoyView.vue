<template>
  <div>
    <!-- HEADER -->
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">{{ diaLabel }}</div>
      <div class="screen-title">{{ diaData.badgeLabel }}</div>
      <div class="screen-sub">Semana 3 · Fase 1 Base</div>
    </header>

    <!-- PROGRESS -->
    <div class="card" style="margin:12px 16px 0;">
      <div class="hoy-progress">
        <div class="hoy-prog-top">
          <div class="hoy-prog-label">{{ progLabel }}</div>
          <div class="hoy-prog-count">{{ doneCnt }} / {{ items.length }}</div>
        </div>
        <div class="hoy-prog-track">
          <div class="hoy-prog-fill" :style="{ width: progPct + '%' }" />
        </div>
      </div>
    </div>

    <!-- GARMIN -->
    <div class="card-title" style="margin-top:4px;">⌚ Garmin</div>
    <div class="card" style="margin-top:0;">
      <div style="display:grid;grid-template-columns:1fr 1fr;">
        <div class="g-card" style="padding:16px 18px 14px;border-right:1px solid #f2f2f0;border-bottom:1px solid #f2f2f0;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">HRV · 7d avg</div>
          <div style="font-size:26px;font-weight:800;letter-spacing:-1px;" :style="{ color: hrvColor(garmin?.hrv_status) }">
            {{ garmin?.hrv_7d_avg ?? '—' }} <span style="font-size:14px;font-weight:600;">ms</span>
          </div>
          <div style="font-size:12px;font-weight:600;margin-top:3px;" :style="{ color: hrvColor(garmin?.hrv_status) }">
            ■ {{ garmin?.hrv_status ?? '—' }}
          </div>
        </div>
        <div class="g-card" style="padding:16px 18px 14px;border-bottom:1px solid #f2f2f0;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">Body Battery</div>
          <div style="font-size:26px;font-weight:800;letter-spacing:-1px;" :style="{ color: bbColor(garmin?.body_battery) }">
            {{ garmin?.body_battery ?? '—' }}
          </div>
          <div style="font-size:12px;color:#888;margin-top:3px;">VO₂Max {{ garmin?.vo2max ?? '—' }} · {{ garmin?.training_status ?? '—' }}</div>
        </div>
        <div class="g-card" style="padding:14px 18px 12px;border-right:1px solid #f2f2f0;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:5px;">Training Load</div>
          <div style="font-size:18px;font-weight:700;color:#111;">{{ garmin?.training_status ?? '—' }}</div>
          <div style="font-size:12px;color:#888;margin-top:2px;">Ratio {{ garmin?.training_load_ratio ?? '—' }}</div>
        </div>
        <div class="g-card" style="padding:14px 18px 12px;">
          <div style="font-size:10px;color:#767676;font-weight:500;text-transform:uppercase;letter-spacing:.8px;margin-bottom:5px;">Fitness Age</div>
          <div style="font-size:26px;font-weight:800;color:#10A46A;letter-spacing:-1px;">{{ garmin?.fitness_age ?? '—' }}</div>
          <div style="font-size:12px;color:#888;margin-top:2px;">vs {{ semana.edadReal ?? 40 }} real</div>
        </div>
      </div>
    </div>

    <!-- CHECKLIST -->
    <div class="card" id="hoy-checklist" style="margin:8px 16px 0;">
      <template v-for="(section, si) in checklist" :key="si">
        <div class="cl-section">{{ section.titulo }}</div>
        <div
          v-for="item in section.items"
          :key="item.id"
          class="cl-item"
          :class="{ done: item.done }"
          @click="toggleItem(item)"
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
          <button
            v-if="item.mealLink"
            @click.stop="goToMeal(item.mealLink)"
            style="flex-shrink:0;border:none;background:#f0f5f1;border-radius:8px;padding:6px 10px;font-size:12px;font-weight:600;color:#10A46A;cursor:pointer;min-width:36px;min-height:36px;"
          >→</button>
        </div>
      </template>
    </div>

    <div class="spacer" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSemanaStore } from '@/stores/semana'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const semana = useSemanaStore()

// ── Garmin data desde Supabase ──
const garmin = ref(null)
async function fetchGarmin() {
  const { data } = await supabase
    .from('garmin_metrics')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (data) garmin.value = data
}

function hrvColor(status) {
  if (!status) return '#888'
  const s = status.toLowerCase()
  if (s.includes('low') || s.includes('baja')) return '#b8860b'
  if (s.includes('high') || s.includes('alta')) return '#10A46A'
  return '#10A46A'
}
function bbColor(val) {
  if (!val) return '#888'
  if (val >= 60) return '#10A46A'
  if (val >= 30) return '#b8860b'
  return '#d32f2f'
}

// ── Header shrink on scroll ──
const shrunk  = ref(false)
let ticking   = false
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      shrunk.value = window.scrollY > 30
      ticking = false
    })
    ticking = true
  }
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  fetchGarmin()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// ── Día actual ──
const idx     = semana.diaIdx()
const dates   = semana.weekDates()
const diaData = semana.dias[idx]

const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const hoy   = dates[idx]
const diaLabel = `${hoy.getDate()} ${MESES[hoy.getMonth()]} · ${semana.DIA_NOMBRE[idx]}`

// ── Checklist dinámico ──
function buildChecklist() {
  const d = diaData
  const sections = []
  let uid = 0
  const mk = (label, hint, mealLink) => ({ id: 'cl-' + uid++, label, hint: hint || '', mealLink: mealLink || null, done: false })

  // Mañana
  const manana = []
  if (d.tipo === 'tirada') {
    manana.push(mk('Preparar comida pre-tirada', 'Tortillas + hummus + aguacate · lista para las 12h'))
    manana.push(mk('Cargar cinturón de hidratación', '500ml agua + sales · listo antes de las 14h'))
  }
  if (d.tipo === 'rodaje' || d.tipo === 'tirada') {
    manana.push(mk('Hidratación desde el inicio', 'Empieza el día con 500ml agua antes de café'))
  }
  if (d.tipo === 'oficina') {
    manana.push(mk('Suplementos en el bolsillo', 'Malato + D3 + K2 + B12 para el desayuno en oficina'))
  }
  manana.push(mk('Peso en ayunas', 'Antes de desayunar · en ayunas'))
  if (manana.length) sections.push({ titulo: '🌅 Esta mañana', items: manana })

  // Sesión
  const sesion = []
  if (d.tipo === 'fuerza') {
    const letra = idx <= 2 ? 'A' : 'B'
    const tren  = letra === 'A' ? 'Tren inferior' : 'Tren superior'
    sections.push({ titulo: `💪 Sesión de Fuerza — ${tren}`, items: [
      mk(`Completar Sesión ${letra}`, '35 min · garaje · 20h'),
      mk('Colágeno 15g + zumo naranja', '90 min antes del entreno · ~18:30h'),
      mk('Calentamiento completo', '5-10 min movilidad articular'),
    ]})
  } else if (d.tipo === 'rodaje') {
    sections.push({ titulo: '🏃 Sesión de Rodaje Z2', items: [
      mk('Completar rodaje Z2', '6 km · FC <150 · sin forzar'),
      mk('Colágeno 15g + zumo naranja', '90 min antes · ~17:30h'),
      mk('Foam roller post-rodaje', 'Gemelos + cuádriceps · 5-10 min'),
    ]})
  } else if (d.tipo === 'tirada') {
    sections.push({ titulo: '🏔️ Tirada Larga', items: [
      mk('Completar tirada Z2 larga', '10-12 km · FC <155 · salida 15h'),
      mk('Colágeno 15g + zumo naranja', '90 min antes de salir · ~13:30h'),
      mk('Sales en bolsillo', 'Tomar en km 3-4'),
      mk('Foam roller completo post-tirada', 'Gemelos · cuádriceps · isquios · 10 min'),
    ]})
  } else if (d.tipo === 'descanso') {
    sections.push({ titulo: '😴 Descanso', items: [
      mk('Descanso activo', 'Movilidad o paseo suave · sin impacto'),
    ]})
  } else if (d.tipo === 'oficina') {
    sections.push({ titulo: '🏢 Oficina', items: [
      mk('Pedir ApetEat antes de las 11h', 'Legumbre + proteína magra · sin fritos'),
    ]})
  }

  // Comidas del día
  const comidas = d.comidas.map(c => mk(
    `${c.hora} · ${c.nombre}`,
    `${c.kcal} · ${c.ings.slice(0,3).map(i => i[0]).join(', ')}`,
    c.id
  ))
  sections.push({ titulo: `🍽️ Comidas · ${d.kcal} kcal`, items: comidas })

  // Suplementos
  if (d.suplementos?.length) {
    sections.push({ titulo: '💊 Suplementos', items: d.suplementos.map(s => mk(s[0], s[1])) })
  }

  // Noche
  const noche = []
  if (d.tipo === 'rodaje' || d.tipo === 'fuerza') {
    noche.push(mk('Foam roller piernas', 'Gemelos + cuádriceps · 5-10 min'))
  }
  noche.push(mk('Dormir antes de las 23h', 'BB bajo — recuperación prioritaria'))
  sections.push({ titulo: '🌙 Esta noche', items: noche })

  return sections
}

const checklist = ref(buildChecklist())

// ── Progress ──
const items   = computed(() => checklist.value.flatMap(s => s.items))
const doneCnt = computed(() => items.value.filter(i => i.done).length)
const progPct = computed(() => items.value.length ? Math.round(doneCnt.value / items.value.length * 100) : 0)
const progLabel = computed(() => {
  const p = progPct.value
  if (p === 100) return '✅ Día completado'
  if (p >= 75)   return '💪 Casi lo tienes'
  if (p >= 50)   return '🔥 Buen ritmo'
  if (p >= 25)   return '🚀 Empezando'
  return 'Checklist del día'
})

function toggleItem(item) { item.done = !item.done }

function goToMeal(mealId) {
  router.push('/nutri?meal=' + mealId)
}
</script>
