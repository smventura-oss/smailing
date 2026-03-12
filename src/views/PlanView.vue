<template>
  <div>
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-tag">Plan optimizado · 54 semanas</div>
      <div class="screen-title">🏃 Maratón BCN 2027</div>
      <div class="screen-sub">Plan revisado 27 feb 2026 · Probabilidades actualizadas</div>
    </header>

    <!-- TABS -->
    <div class="plan-tabs">
      <div v-for="tab in tabs" :key="tab.id" class="plan-tab" :class="{ active: tabActivo === tab.id }" @click="tabActivo = tab.id">
        {{ tab.label }}
      </div>
    </div>

    <!-- ═══ ESTA SEMANA ═══ -->
    <div v-if="tabActivo === 'semana'" class="plan-panel active">
      <div style="background:var(--md-success-container);border-left:4px solid var(--md-success);border-radius:8px;padding:8px 12px;margin-bottom:16px;font-size:12px;color:var(--md-success);font-weight:700;">
        FASE 1 · Semana 3 de 16 · 9–15 mar 2026 · <span style="font-weight:400;">Base pura — recuperación resfriado</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;">
        <div style="background:var(--md-surface);border:1px solid var(--md-outline-variant);border-radius:12px;padding:12px;text-align:center;">
          <div style="font-size:20px;font-weight:800;color:var(--md-success);">16</div>
          <div style="font-size:10px;color:#888;margin-top:2px;">km planif.</div>
        </div>
        <div style="background:var(--md-surface);border:1px solid var(--md-outline-variant);border-radius:12px;padding:12px;text-align:center;">
          <div style="font-size:20px;font-weight:800;color:#5c6bc0;">2</div>
          <div style="font-size:10px;color:#888;margin-top:2px;">sesiones fuerza</div>
        </div>
        <div style="background:var(--md-surface);border:1px solid var(--md-outline-variant);border-radius:12px;padding:12px;text-align:center;">
          <div style="font-size:20px;font-weight:800;color:#ef6c00;">⚠️</div>
          <div style="font-size:10px;color:#888;margin-top:2px;">Strained</div>
        </div>
      </div>
      <div style="background:var(--md-surface);border-radius:12px;border:1px solid var(--md-outline-variant);overflow:hidden;margin-bottom:16px;">
        <table class="wtable">
          <tr><th>Día</th><th>Sesión</th><th>km / min</th></tr>
          <tr><td class="wday">LUN 9</td><td class="wrest">😴 Descanso — resfriado</td><td class="wkm">—</td></tr>
          <tr><td class="wday">MAR 10</td><td class="wrest">🏢 Oficina — sin entreno</td><td class="wkm">—</td></tr>
          <tr style="background:#f0faf4;"><td class="wday">MIÉ 11</td><td>💪 Fuerza garaje A · 20h <span style="background:#e8f5e9;color:#2e7d32;font-size:10px;padding:2px 6px;border-radius:10px;margin-left:4px;">✅ Completada</span></td><td class="wkm">23 min</td></tr>
          <tr><td class="wday">JUE 12</td><td>💪 Fuerza garaje B · 20h · Tren superior + core</td><td class="wkm">35 min</td></tr>
          <tr><td class="wday">VIE 13</td><td>🏃 Rodaje Z1-Z2 · FC &lt;150 · Primer rodaje post-resfriado</td><td class="wkm">6</td></tr>
          <tr><td class="wday">SÁB 14</td><td>🏔️ Tirada trail Z2 · FC &lt;155 · Sin forzar</td><td class="wkm">10–12</td></tr>
          <tr><td class="wday">DOM 15</td><td class="wrest">😴 Descanso — familia</td><td class="wkm">—</td></tr>
        </table>
      </div>
      <div style="font-size:13px;font-weight:700;color:#333;margin-bottom:8px;">💪 Fuerza garaje — detalle sesiones</div>
      <div style="background:var(--md-surface);border:1px solid var(--md-outline-variant);border-radius:12px;padding:14px;margin-bottom:10px;">
        <div style="font-weight:700;font-size:13px;margin-bottom:10px;">Fuerza A · Miércoles · Tren inferior + glúteos</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;">
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🦵 Sentadilla goblet<br><span style="color:#888;">3×10 · MC 16kg</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🏋️ Hip thrust con mancuerna<br><span style="color:#888;">3×12 · 22kg</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🦵 Zancadas inversas<br><span style="color:#888;">3×10 c/lado · 2×10kg</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🐸 Puente glúteo unilateral<br><span style="color:#888;">3×12 c/lado</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">📦 Step-up plyo box<br><span style="color:#888;">3×8 c/lado · 2×12kg</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🧘 Plancha isométrica<br><span style="color:#888;">3×30s</span></div>
        </div>
      </div>
      <div style="background:var(--md-surface);border:1px solid var(--md-outline-variant);border-radius:12px;padding:14px;margin-bottom:16px;">
        <div style="font-weight:700;font-size:13px;margin-bottom:10px;">Fuerza B · Jueves · Tren superior + core</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px;">
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">💪 Press banca inclinado<br><span style="color:#888;">3×10 · 2×18kg</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🏋️ Remo con mancuerna<br><span style="color:#888;">3×12 c/lado · 20kg</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">💪 Press militar de pie<br><span style="color:#888;">3×10 · 2×14kg</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🏃 Curl femoral TecTake<br><span style="color:#888;">3×12</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🧘 Dead bug<br><span style="color:#888;">3×10 c/lado</span></div>
          <div style="background:#f5f5f5;border-radius:8px;padding:8px;">🔄 Rotación rusa<br><span style="color:#888;">3×15 · 8kg</span></div>
        </div>
      </div>
      <div style="background:#fff3e0;border-left:4px solid #ef6c00;border-radius:8px;padding:10px 14px;font-size:12px;color:#bf360c;">
        ⚠️ <strong>Garmin Strained</strong> — BB 27 · HRV 30ms Low. Sesiones ligeras esta semana. Si el jueves BB &lt;35 o HRV sigue bajo, sustituir Fuerza B por movilidad/foam roller.
      </div>
    </div>

    <!-- ═══ CARRERAS ═══ -->
    <div v-if="tabActivo === 'carreras'" class="plan-panel active">
      <!-- Salomon Montjuïc -->
      <div class="race-card">
        <div class="rc-head">
          <div class="rc-title">Salomon Run Montjuïc</div>
          <div class="rc-date">Abril 2026 · ~6 sem.</div>
          <div class="rc-badges"><span class="tag amber">Trail 9.4K</span>&nbsp;<span class="tag green">✅ Inscrito</span></div>
        </div>
        <div class="rc-stats rc-stats-4">
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-warning)">9.4K</div><div class="rs-lbl">Distancia</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-warning)">+238m</div><div class="rs-lbl">Desnivel</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-error)">1h30:00</div><div class="rs-lbl">⏱ Límite</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-success)">~1h15</div><div class="rs-lbl">Objetivo</div></div>
        </div>
        <div class="rc-body">
          <p class="strategy"><strong>Estrategia:</strong> Salomon Sense Ride 5 · ritmo por encima de Z2 · caminar rampas >12% · sales desde km 3.</p>
          <div class="prob-toggle" @click="toggleProb('ps1')">
            <div class="prob-left">
              <div class="prob-circle" style="background:var(--md-success-container);color:var(--md-success)">88%</div>
              <div><div class="prob-lbl">Probabilidad de acabar en tiempo</div><div class="prob-sub">Límite 1h30 · actualizado 1 mar 2026</div></div>
            </div>
            <div class="prob-arrow" :style="{ transform: probOpen.ps1 ? 'rotate(180deg)' : '' }">▾</div>
          </div>
          <div class="prob-panel" :class="{ open: probOpen.ps1 }">
            <div class="prob-before-after"><span class="prob-old">88%</span><span class="prob-arr">→</span><span class="prob-new">88%</span></div>
            <div class="prob-bar-wrap"><div class="prob-bar-track"><div class="prob-bar-fill" style="width:88%;background:var(--md-success)"></div></div></div>
            <div class="gap-title">✅ A favor</div>
            <div class="gap-item"><div class="gap-icon">💚</div><div class="gap-text"><strong>Olesa Z2 en 10:31/km con +318m</strong> — Montjuïc +238m y a ritmo carrera = margen real para bajar a 8:00/km.</div><div class="gap-delta dg">+15%</div></div>
            <div class="gap-item"><div class="gap-icon">💚</div><div class="gap-text"><strong>Sin lesión activa</strong> — tobillo sin síntomas.</div><div class="gap-delta dg">+10%</div></div>
            <div class="gap-title">⚠️ Gap residual (+12%)</div>
            <div class="gap-item"><div class="gap-icon">📈</div><div class="gap-text"><strong>Nunca has corrido a ritmo carrera en trail</strong> — necesitas 1-2 sesiones a ritmo objetivo antes de abril.</div><div class="gap-delta da">+8%</div></div>
          </div>
        </div>
      </div>
      <!-- Diagonal -->
      <div class="race-card">
        <div class="rc-head">
          <div class="rc-title">Cursa de la Diagonal</div>
          <div class="rc-date">24 Mayo 2026 · ~12 sem.</div>
          <div class="rc-badges"><span class="tag blue">Asfalto 10K</span>&nbsp;<span class="tag green">✅ Inscrito</span></div>
        </div>
        <div class="rc-stats">
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-secondary)">10K</div><div class="rs-lbl">Distancia</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-secondary)">−71m</div><div class="rs-lbl">Desnivel</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-secondary)">&lt;55:00</div><div class="rs-lbl">Objetivo</div></div>
        </div>
        <div class="rc-body">
          <p class="strategy"><strong>Estrategia:</strong> Velocity Nitro 4 · conservador km 0-3 (subida) · acelerar progresivo · todo en bajada final.</p>
          <div class="prob-toggle" @click="toggleProb('ps2')">
            <div class="prob-left">
              <div class="prob-circle" style="background:var(--md-warning-container);color:var(--md-warning)">80%</div>
              <div><div class="prob-lbl">Probabilidad de sub 55:00</div><div class="prob-sub">Antes: 71% → Ahora: 82%</div></div>
            </div>
            <div class="prob-arrow" :style="{ transform: probOpen.ps2 ? 'rotate(180deg)' : '' }">▾</div>
          </div>
          <div class="prob-panel" :class="{ open: probOpen.ps2 }">
            <div class="prob-before-after"><span class="prob-old">71%</span><span class="prob-arr">→</span><span class="prob-new">80%</span></div>
            <div class="prob-bar-wrap"><div class="prob-bar-track"><div class="prob-bar-fill" style="width:80%;background:var(--md-warning)"></div></div></div>
            <div class="gap-title">✅ A favor</div>
            <div class="gap-item"><div class="gap-icon">💚</div><div class="gap-text"><strong>3 semanas de tempo 5:30-5:40/km</strong> — bloque específico pre-Diagonal sem 9-11.</div><div class="gap-delta dg">+7%</div></div>
            <div class="gap-item"><div class="gap-icon">💚</div><div class="gap-text"><strong>PR 57:46 + desnivel neto −71m</strong> — potencial real con forma.</div><div class="gap-delta dg">+10%</div></div>
            <div class="gap-title">⚠️ Gap residual (+18%)</div>
            <div class="gap-item"><div class="gap-icon">⚖️</div><div class="gap-text"><strong>Peso</strong> — llegar a 77-78 kg en mayo vale ~1-1:30 min en 10K.</div><div class="gap-delta da">+10%</div></div>
          </div>
        </div>
      </div>
      <!-- Bonesvalls -->
      <div class="race-card">
        <div class="rc-head">
          <div class="rc-title">Marca Bonesvalls Trail</div>
          <div class="rc-date">18 Oct 2026 · 32 sem. · 228 días</div>
          <div class="rc-badges"><span class="tag amber">Trail 26K</span>&nbsp;<span class="tag green">✅ Fecha confirmada</span></div>
        </div>
        <div class="rc-stats">
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-warning)">26K</div><div class="rs-lbl">Distancia</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-warning)">Alto</div><div class="rs-lbl">Desnivel</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-success)">Completar</div><div class="rs-lbl">Objetivo</div></div>
        </div>
        <div class="rc-body">
          <p class="strategy"><strong>Estrategia:</strong> Electrify Nitro 4 · caminar todas las subidas · gel y sales cada 45 min.</p>
          <div class="prob-toggle" @click="toggleProb('ps3')">
            <div class="prob-left">
              <div class="prob-circle" style="background:var(--md-success-container);color:var(--md-success)">91%</div>
              <div><div class="prob-lbl">Probabilidad de completarla</div><div class="prob-sub">Antes: 84% → Ahora: 91%</div></div>
            </div>
            <div class="prob-arrow" :style="{ transform: probOpen.ps3 ? 'rotate(180deg)' : '' }">▾</div>
          </div>
          <div class="prob-panel" :class="{ open: probOpen.ps3 }">
            <div class="prob-before-after"><span class="prob-old">84%</span><span class="prob-arr">→</span><span class="prob-new">91%</span></div>
            <div class="prob-bar-wrap"><div class="prob-bar-track"><div class="prob-bar-fill" style="width:91%;background:var(--md-success)"></div></div></div>
            <div class="gap-title">✅ A favor</div>
            <div class="gap-item"><div class="gap-icon">💚</div><div class="gap-text"><strong>Tiradas con 300-400m D+ en Fase 2</strong> — 7-10 tiradas con desnivel real.</div><div class="gap-delta dg">+9%</div></div>
            <div class="gap-item"><div class="gap-icon">💚</div><div class="gap-text"><strong>Objetivo conservador</strong> — solo completar.</div><div class="gap-delta dg">+10%</div></div>
          </div>
        </div>
      </div>
      <!-- Mitja -->
      <div class="race-card">
        <div class="rc-head">
          <div class="rc-title">Mitja Marató Barcelona</div>
          <div class="rc-date">~15 Feb 2027 · ~50 sem.</div>
          <div class="rc-badges"><span class="tag purple">21K asfalto</span>&nbsp;<span class="tag amber">⚠️ Abre verano</span></div>
        </div>
        <div class="rc-stats">
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-primary)">22.2K</div><div class="rs-lbl">Distancia</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-primary)">+37m</div><div class="rs-lbl">Desnivel</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-primary)">&lt;2:15h</div><div class="rs-lbl">Objetivo</div></div>
        </div>
        <div class="rc-body">
          <p class="strategy"><strong>Estrategia:</strong> 6:03/km · test definitivo de forma.</p>
          <div class="prob-toggle" @click="toggleProb('ps4')">
            <div class="prob-left">
              <div class="prob-circle" style="background:var(--md-primary-container);color:var(--md-primary)">83%</div>
              <div><div class="prob-lbl">Probabilidad de sub 2:15h</div><div class="prob-sub">Antes: 74% → Ahora: 83%</div></div>
            </div>
            <div class="prob-arrow" :style="{ transform: probOpen.ps4 ? 'rotate(180deg)' : '' }">▾</div>
          </div>
          <div class="prob-panel" :class="{ open: probOpen.ps4 }">
            <div class="prob-before-after"><span class="prob-old">74%</span><span class="prob-arr">→</span><span class="prob-new">83%</span></div>
            <div class="prob-bar-wrap"><div class="prob-bar-track"><div class="prob-bar-fill" style="width:83%;background:var(--md-primary)"></div></div></div>
          </div>
        </div>
      </div>
      <!-- Maratón -->
      <div class="race-card">
        <div class="rc-head">
          <div class="rc-title">Maratón Barcelona 🎯</div>
          <div class="rc-date">~14 Mar 2027 · ~54 sem.</div>
          <div class="rc-badges"><span class="tag red">42K asfalto</span>&nbsp;<span class="tag amber">⚠️ Abre junio</span></div>
        </div>
        <div class="rc-stats">
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-error)">43.1K</div><div class="rs-lbl">Distancia</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-error)">+222m</div><div class="rs-lbl">Desnivel</div></div>
          <div class="rc-stat"><div class="rs-val" style="color:var(--md-error)">&lt;5:00h</div><div class="rs-lbl">Objetivo</div></div>
        </div>
        <div class="rc-body">
          <p class="strategy"><strong>Km 0-14:</strong> 7:20/km conservador. <strong>Km 14-30:</strong> 7:00-7:10/km. <strong>Km 30-42:</strong> gestionar el muro. Gel cada 40-45 min desde km 10.</p>
          <div class="prob-toggle" @click="toggleProb('ps5')">
            <div class="prob-left">
              <div class="prob-circle" style="background:var(--md-warning-container);color:var(--md-warning)">87%</div>
              <div><div class="prob-lbl">Probabilidad de sub 5:00h</div><div class="prob-sub">Antes: 82% → Ahora: 87%</div></div>
            </div>
            <div class="prob-arrow" :style="{ transform: probOpen.ps5 ? 'rotate(180deg)' : '' }">▾</div>
          </div>
          <div class="prob-panel" :class="{ open: probOpen.ps5 }">
            <div class="prob-before-after"><span class="prob-old">82%</span><span class="prob-arr">→</span><span class="prob-new">87%</span></div>
            <div class="prob-bar-wrap"><div class="prob-bar-track"><div class="prob-bar-fill" style="width:87%;background:var(--md-error)"></div></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ FASES ═══ -->
    <div v-if="tabActivo === 'fases'" class="plan-panel active">
      <div v-for="fase in fases" :key="fase.id" class="phase-card" :class="[fase.color, { open: fasesOpen[fase.id] }]">
        <div class="phase-head" @click="fasesOpen[fase.id] = !fasesOpen[fase.id]">
          <div>
            <div class="phase-num">{{ fase.num }}</div>
            <div class="phase-name">{{ fase.nombre }}</div>
            <div class="phase-dates">{{ fase.fechas }}</div>
          </div>
          <div class="phase-arrow">▾</div>
        </div>
        <div class="phase-body">
          <div class="phase-stats">
            <div v-for="stat in fase.stats" :key="stat.label" class="phase-stat">
              <div class="ps-val" :style="{ color: stat.color }">{{ stat.val }}</div>
              <div class="ps-lbl">{{ stat.label }}</div>
            </div>
          </div>
          <div v-for="bloque in fase.bloques" :key="bloque.titulo">
            <div class="wtable-title">{{ bloque.titulo }} <span v-if="bloque.nuevo" class="change-badge">✦ Nuevo</span></div>
            <table class="wtable">
              <tr><th>Día</th><th>Sesión</th><th>km</th></tr>
              <tr v-for="row in bloque.rows" :key="row[0]" :class="{ 'new-session': row[3] }">
                <td class="wday">{{ row[0] }}</td>
                <td :class="{ wrest: row[2] }">{{ row[1] }}</td>
                <td class="wkm">{{ row[2] || row[3] ? (row[2] || '—') : row[2] }}</td>
              </tr>
            </table>
          </div>
          <div style="height:8px" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

const tabs = [
  { id: 'semana',   label: 'Esta semana' },
  { id: 'carreras', label: 'Carreras'    },
  { id: 'fases',    label: 'Fases del plan' },
]
const tabActivo = ref('semana')

// ── Probabilidades toggle ──
const probOpen = ref({ ps1: false, ps2: false, ps3: false, ps4: false, ps5: false })
function toggleProb(id) { probOpen.value[id] = !probOpen.value[id] }

// ── Fases open/close ──
const fasesOpen = ref({ f1: true, f2: false, f3: false, f4: false })

// ── Datos de fases ──
const fases = [
  {
    id: 'f1', color: 'p1', num: 'Fase 01', nombre: 'Base Aeróbica', fechas: 'Marzo → Junio 2026 · 16 sem.',
    stats: [
      { val: '20-35', label: 'km/sem',   color: 'var(--md-success)' },
      { val: '3',     label: 'sesiones', color: 'var(--md-success)' },
      { val: '<155',  label: 'FC máx',   color: 'var(--md-success)' },
      { val: '80%',   label: 'Zona 2',   color: 'var(--md-success)' },
    ],
    bloques: [
      {
        titulo: 'Sem 1–3 · Base pura',
        rows: [
          ['LUN 19h', 'Rodaje suave Z2 · FC <155 · Velocity Nitro 4', '6-8'],
          ['MIÉ 19h', 'Fuerza garaje 35-40 min', '—'],
          ['VIE 19h', 'Rodaje suave Z2', '6-8'],
          ['SÁB 15h', 'Tirada larga trail Z2 · Electrify Nitro 4', '10-14'],
        ],
      },
      {
        titulo: 'Sem 4–8 · Strides + desnivel', nuevo: true,
        rows: [
          ['LUN 19h', 'Rodaje suave Z2 · Velocity Nitro 4', '7-9'],
          ['MIÉ 19h', 'Fuerza garaje 40 min', '—'],
          ['VIE 19h', 'Rodaje Z2 + 6×20 seg strides al final · FC libre en strides', '7-9', true],
          ['SÁB 15h', 'Tirada trail con desnivel progresivo 80-150m D+', '12-16', true],
        ],
      },
      {
        titulo: 'Sem 9–11 · Bloque pre-Diagonal', nuevo: true,
        rows: [
          ['LUN 19h', 'Rodaje suave Z2', '8'],
          ['MIÉ 19h', 'Fuerza garaje 40 min', '—'],
          ['VIE 19h', '2km Z2 calent. + 3km a 5:30-5:40/km + 2km Z2 vuelta', '7', true],
          ['SÁB 15h', 'Tirada trail 14-16km Z2', '14-16'],
        ],
      },
    ],
  },
  {
    id: 'f2', color: 'p2', num: 'Fase 02', nombre: 'Desarrollo', fechas: 'Julio → Sep 2026 · 13 sem.',
    stats: [
      { val: '35-48', label: 'km/sem',    color: 'var(--md-secondary)' },
      { val: '4',     label: 'sesiones',  color: 'var(--md-secondary)' },
      { val: '<165',  label: 'FC máx',    color: 'var(--md-secondary)' },
      { val: '300m+', label: 'D+ mínimo', color: 'var(--md-secondary)' },
    ],
    bloques: [
      {
        titulo: 'Sem 1–6 · Desarrollo con desnivel', nuevo: true,
        rows: [
          ['LUN 19h', 'Rodaje suave Z2', '8-10'],
          ['MAR 19h', 'Regenerativo Z1', '5-6'],
          ['MIÉ 19h', 'Fuerza garaje 40 min', '—'],
          ['VIE 19h', 'Tempo 10km · Z2 calent. + 4km Z3 + Z2 vuelta', '10', true],
          ['SÁB 15h', 'Tirada trail 18-20km con 300m+ D+', '18-20', true],
        ],
      },
      {
        titulo: 'Sem 7–10 · Tempo largo + Bonesvalls prep', nuevo: true,
        rows: [
          ['LUN 19h', 'Rodaje suave Z2', '10'],
          ['MAR 19h', 'Regenerativo Z1', '6'],
          ['MIÉ 19h', 'Fuerza 40 min', '—'],
          ['VIE 19h', 'Tempo 12km · 3km Z2 + 6km Z3 + 3km Z2', '12', true],
          ['SÁB 15h', 'Tirada trail 20-22km con 400m+ D+', '20-22', true],
        ],
      },
    ],
  },
  {
    id: 'f3', color: 'p3', num: 'Fase 03', nombre: 'Específica Maratón', fechas: 'Nov → Dic 2026 · 13 sem.',
    stats: [
      { val: '50-60', label: 'km/sem',   color: 'var(--md-warning)' },
      { val: '4-5',   label: 'sesiones', color: 'var(--md-warning)' },
      { val: '28-32', label: 'km tirada',color: 'var(--md-warning)' },
      { val: '7:00',  label: 'min/km obj.',color: 'var(--md-warning)'},
    ],
    bloques: [
      {
        titulo: 'Sem 1–8 · Bloque ritmo maratón', nuevo: true,
        rows: [
          ['LUN 19h', 'Recuperación Z1-2', '8'],
          ['MAR 19h', 'Ritmo maratón 7:00-7:10/km · Velocity Nitro 4', '10-12', true],
          ['JUE 19h', 'Rodaje suave Z2', '10'],
          ['SÁB 15h', 'Simulacro largo con gel c/45 min + sales', '26-32', true],
        ],
      },
    ],
  },
  {
    id: 'f4', color: 'p4', num: 'Fase 04', nombre: 'Pico & Tapering', fechas: 'Ene → 2 Mar 2027 · 8 sem.',
    stats: [
      { val: '55-65', label: 'km pico',      color: 'var(--md-primary)' },
      { val: '3',     label: 'sem. taper',   color: 'var(--md-primary)' },
      { val: '32km',  label: 'simulacro ene',color: 'var(--md-primary)' },
      { val: '2 MAR', label: 'Día D',        color: 'var(--md-error)'   },
    ],
    bloques: [
      {
        titulo: 'Sem 1–2 · Pico máximo', nuevo: true,
        rows: [
          ['LUN 19h', 'Recuperación Z1-2', '8'],
          ['MAR 19h', 'Ritmo maratón 7:00/km', '12'],
          ['JUE 19h', 'Rodaje suave Z2', '10'],
          ['SÁB 15h', 'Simulacro 32km con nutrición completa · ritmo maratón final 15km', '32', true],
        ],
      },
      {
        titulo: 'Sem 4–6 · Tapering (40/60/80% reducción)',
        rows: [
          ['LUN 19h', 'Rodaje suave Z2', '8'],
          ['MIÉ 19h', '3km Z2 + 3km ritmo maratón + 2km Z2', '8'],
          ['VIE 19h', 'Rodaje muy suave', '5'],
          ['SÁB 15h', 'Tirada moderada · últimas sensaciones', '14-16'],
        ],
      },
      {
        titulo: 'Sem 7–8 · Pre-maratón',
        rows: [
          ['LUN 19h', 'Rodaje muy suave Z1', '6'],
          ['MIÉ 19h', '2km suave + 2km a 7:00/km + 2km suave', '6'],
          ['VIE', 'Descanso completo', '—'],
          ['DOM 2 MAR', '🎯 MARATÓN BARCELONA · Sub 5:00h', '42K', true],
        ],
      },
    ],
  },
]
</script>
