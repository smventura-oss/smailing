<template>
  <div>
    <!-- HEADER -->
    <header class="screen-header" :class="{ shrunk }">
      <div class="screen-title">🍽️ Nutrición</div>
      <div class="screen-sub">Objetivo déficit −300 kcal/día</div>
    </header>

    <!-- COMIDAS / DESPENSA toggle -->
    <div v-if="vista === 'comidas'" id="sn-comidas">
      <!-- DAY STRIP -->
      <div class="day-strip">
        <div
          v-for="(dia, i) in semana.dias"
          :key="i"
          class="chip"
          :class="{ active: diaActivo === i, past: i < hoyIdx }"
          @click="diaActivo = i"
        >
          <div class="chip-day">{{ DIAS_CORTOS[i] }}</div>
          <div class="chip-num">{{ fechas[i] }}</div>
          <div class="chip-tag" :class="semana.DIA_TAG_CSS[i]">{{ semana.DIA_TAGS[i] }}</div>
        </div>
      </div>

      <!-- DAY PANELS -->
      <div class="day-panels">
        <div
          v-for="(dia, i) in semana.dias"
          :key="i"
          class="day-panel"
          :class="{ active: diaActivo === i }"
        >
          <!-- KCAL BAR -->
          <div class="kcal-bar">
            <div class="kcal-badge-row">
              <div class="train-badge" :class="dia.badge">{{ dia.badgeLabel }}</div>
            </div>
            <div v-if="dia.badgeExtra" class="kcal-badge-row" style="margin-top:4px;">
              <div class="train-badge" :style="dia.badgeExtra.style">{{ dia.badgeExtra.label }}</div>
            </div>
            <div>
              <div class="kcal-val">{{ dia.kcal }}</div>
              <div class="kcal-sub">{{ dia.deficit }}</div>
            </div>
            <div class="macro-row">
              <div class="macro"><div class="mval">{{ dia.proteina }}</div><div class="mlbl">Prot.</div></div>
              <div class="macro"><div class="mval">{{ dia.carbos }}</div><div class="mlbl">Carbos</div></div>
              <div class="macro"><div class="mval">{{ dia.grasa }}</div><div class="mlbl">Grasa</div></div>
            </div>
          </div>

          <!-- COMIDAS -->
          <div
            v-for="comida in dia.comidas"
            :key="comida.id"
            class="meal"
            :class="{ collapsed: collapsed[comida.id] }"
            :id="'meal-' + comida.id"
          >
            <div class="meal-head" @click="toggleMeal(comida.id)">
              <div class="meal-left">
                <div class="meal-time">{{ comida.hora }}</div>
                <div class="meal-name">{{ comida.nombre }}</div>
              </div>
              <div class="meal-kcal">{{ comida.kcal }}</div>
            </div>
            <div class="meal-body">
              <div v-for="([nombre, cantidad], j) in comida.ings" :key="j" class="ing">
                <span>{{ nombre }}</span><span class="ing-g">{{ cantidad }}</span>
              </div>
              <div v-if="comida.nota" class="meal-note">{{ comida.nota }}</div>
            </div>
          </div>

          <!-- SUPLEMENTOS -->
          <div v-if="dia.suplementos?.length" class="suppl">
            <div class="suppl-title">💊 Suplementación</div>
            <div v-for="([nombre, cuando], j) in dia.suplementos" :key="j" class="suppl-row">
              <span>{{ nombre }}</span><span class="suppl-when">{{ cuando }}</span>
            </div>
          </div>

          <!-- NOTA -->
          <div v-if="dia.nota" class="note" :class="dia.nota.tipo">{{ dia.nota.texto }}</div>
        </div>
      </div><!-- end day-panels -->

      <!-- BOTÓN DESPENSA -->
      <div style="margin:4px 16px 16px;text-align:center;">
        <button
          @click="vista = 'despensa'"
          style="background:none;border:1px solid #e0e0dc;border-radius:8px;padding:10px 20px;font-size:13px;color:#767676;cursor:pointer;width:100%;font-weight:500;"
        >🥫 Ver despensa completa</button>
      </div>
    </div><!-- end sn-comidas -->

    <!-- DESPENSA -->
    <div v-else id="sn-desp">
      <header class="screen-header" style="padding:12px 16px 10px;position:static;">
        <div style="display:flex;align-items:center;gap:12px;">
          <button
            @click="vista = 'comidas'"
            style="border:none;background:rgba(255,255,255,0.2);border-radius:8px;padding:6px 12px;font-size:13px;color:#fff;cursor:pointer;font-weight:600;"
          >← Volver</button>
          <div>
            <div class="screen-tag">Inventario · 27 feb 2026</div>
            <div class="screen-title" style="font-size:18px;">🥫 Despensa</div>
          </div>
        </div>
      </header>

      <!-- TABS stock / compra -->
      <div class="desp-tabs">
        <div class="desp-tab" :class="{ active: despTab === 'stock' }" @click="despTab = 'stock'">
          🏠 Stock <span class="badge-count">{{ stockCount }}</span>
        </div>
        <div class="desp-tab" :class="{ active: despTab === 'compra' }" @click="despTab = 'compra'">
          🛒 Por comprar <span class="badge-count" style="background:var(--md-error);">{{ compraCount }}</span>
        </div>
      </div>

      <!-- PANEL STOCK -->
      <div v-if="despTab === 'stock'" class="desp-panel active">
        <div v-if="!stockItems.length" class="desp-empty">
          <span class="desp-empty-icon">🏠</span>Despensa vacía
        </div>
        <template v-else>
          <template v-for="cat in semana.CATS" :key="cat.id">
            <div v-if="stockPorCat(cat.id).length" class="desp-section">
              <div class="desp-sec-head">{{ cat.label }}</div>
              <div v-for="item in stockPorCat(cat.id)" :key="item.id" class="desp-item">
                <div class="desp-item-info">
                  <div>{{ item.name }}</div>
                  <div v-if="item.note" class="desp-item-note">{{ item.note }}</div>
                </div>
                <button class="btn-comprar" @click="semana.moverACompra(item.id)">Comprar</button>
              </div>
            </div>
          </template>
        </template>
        <div style="height:16px" />
      </div>

      <!-- PANEL COMPRA -->
      <div v-else class="desp-panel active">
        <button class="btn-all" @click="semana.marcarTodoComprado()">✓ Todo comprado — mover a despensa</button>
        <div v-if="!compraItems.length" class="desp-empty">
          <span class="desp-empty-icon">🎉</span>¡Todo en despensa!
        </div>
        <template v-else>
          <template v-for="cat in semana.CATS" :key="cat.id">
            <div v-if="compraPorCat(cat.id).length" class="desp-section">
              <div class="desp-sec-head">{{ cat.label }}</div>
              <div
                v-for="item in compraPorCat(cat.id)"
                :key="item.id"
                class="compra-item"
                :class="{ bought: semana.despensaState[item.id]?.bought }"
                @click="semana.toggleBought(item.id)"
              >
                <div class="checkbox"><span class="checkmark">✓</span></div>
                <div>
                  <div class="compra-name">{{ item.name }}</div>
                  <div v-if="item.note" class="compra-note">{{ item.note }}</div>
                </div>
              </div>
            </div>
          </template>
        </template>
        <div style="height:16px" />
      </div>
    </div><!-- end sn-desp -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSemanaStore } from '@/stores/semana'

const semana = useSemanaStore()
const route  = useRoute()

// ── Header shrink ──
const shrunk  = ref(false)
let ticking   = false
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => { shrunk.value = window.scrollY > 30; ticking = false })
    ticking = true
  }
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  // Si llega con ?meal=xxx, expandir ese día
  if (route.query.meal) {
    const mealId = route.query.meal
    const dayIdx = semana.dias.findIndex(d => d.comidas.some(c => c.id === mealId))
    if (dayIdx !== -1) diaActivo.value = dayIdx
  }
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// ── Días ──
const DIAS_CORTOS = ['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM']
const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const hoyIdx = semana.diaIdx()
const dates  = semana.weekDates()
const fechas = dates.map(d => d.getDate())

const diaActivo = ref(hoyIdx)
const vista     = ref('comidas')
const despTab   = ref('stock')
const collapsed = ref({})

function toggleMeal(id) {
  collapsed.value[id] = !collapsed.value[id]
}

// ── Despensa ──
const stockItems  = computed(() => semana.ITEMS.filter(i => semana.despensaState[i.id]?.inDesp))
const compraItems = computed(() => semana.ITEMS.filter(i => !semana.despensaState[i.id]?.inDesp))
const stockCount  = computed(() => stockItems.value.length)
const compraCount = computed(() => compraItems.value.length)

const stockPorCat  = (catId) => stockItems.value.filter(i => i.cat === catId)
const compraPorCat = (catId) => compraItems.value.filter(i => i.cat === catId)
</script>
