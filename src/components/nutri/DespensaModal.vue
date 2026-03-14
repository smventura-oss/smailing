<template>
  <div class="modal-overlay" :class="{ open }" @click.self="$emit('close')">
    <div class="modal-sheet">
      <div class="modal-handle" />
      <div class="modal-header">
        <div class="modal-title">🥫 Despensa</div>
        <button class="modal-close" @click="$emit('close')">×</button>
      </div>

      <!-- Main tabs: Casa / Oficina -->
      <div class="modal-tabs">
        <div class="modal-tab" :class="{ active: mainTab === 'casa' }"    @click="mainTab = 'casa'">🏠 Casa</div>
        <div class="modal-tab" :class="{ active: mainTab === 'oficina' }" @click="mainTab = 'oficina'">🏢 Oficina</div>
      </div>

      <div class="modal-body">
        <!-- CASA -->
        <template v-if="mainTab === 'casa'">
          <div class="modal-tabs" style="border-bottom:1px solid #f0f0ee; flex-shrink:0;">
            <div class="modal-tab" :class="{ active: subTab === 'stock' }" @click="subTab = 'stock'">
              En stock
              <span style="background:#d0f0e4;color:#10A46A;border-radius:100px;padding:1px 7px;font-size:11px;margin-left:4px;">{{ desp.inDesp.length }}</span>
            </div>
            <div class="modal-tab" :class="{ active: subTab === 'compra' }" @click="subTab = 'compra'">
              Por comprar
              <span style="background:#fde8e8;color:#9b2a2a;border-radius:100px;padding:1px 7px;font-size:11px;margin-left:4px;">{{ desp.inCompra.length }}</span>
            </div>
          </div>

          <!-- Stock list -->
          <template v-if="subTab === 'stock'">
            <template v-if="desp.inDesp.length">
              <template v-for="cat in CATS" :key="cat.id">
                <template v-if="byCat(desp.inDesp, cat.id).length">
                  <div class="modal-section">{{ cat.label }}</div>
                  <div v-for="item in byCat(desp.inDesp, cat.id)" :key="item.id" class="modal-row">
                    <div class="modal-row-label">{{ item.name }}</div>
                    <button class="btn-comprar" @click="desp.moveToCompra(item.id)">Comprar</button>
                  </div>
                </template>
              </template>
            </template>
            <div v-else style="padding:32px 20px;text-align:center;color:#767676;">📦 Despensa vacía</div>
          </template>

          <!-- Compra list -->
          <template v-if="subTab === 'compra'">
            <div v-if="desp.inCompra.length" style="padding:12px 16px 0;">
              <button class="btn-all" @click="desp.markAllBought()">✓ Todo comprado</button>
            </div>
            <template v-if="desp.inCompra.length">
              <template v-for="cat in CATS" :key="cat.id">
                <template v-if="byCat(desp.inCompra, cat.id).length">
                  <div class="modal-section">{{ cat.label }}</div>
                  <div
                    v-for="item in byCat(desp.inCompra, cat.id)"
                    :key="item.id"
                    class="modal-row"
                    :style="desp.isBought(item.id) ? 'opacity:.5;cursor:pointer;' : 'cursor:pointer;'"
                    @click="desp.toggleBought(item.id)"
                  >
                    <div class="compra-check" :class="{ bought: desp.isBought(item.id) }">
                      <svg v-if="desp.isBought(item.id)" viewBox="0 0 12 12" fill="none" width="10" height="10">
                        <polyline points="1.5,6 5,9.5 10.5,2.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="modal-row-label" :style="desp.isBought(item.id) ? 'text-decoration:line-through' : ''">{{ item.name }}</div>
                  </div>
                </template>
              </template>
            </template>
            <div v-else style="padding:32px 20px;text-align:center;color:#767676;">🎉 ¡Todo en despensa!</div>
          </template>
        </template>

        <!-- OFICINA -->
        <template v-if="mainTab === 'oficina'">
          <div class="modal-section">🌅 Siempre disponible</div>
          <div v-for="item in OFICINA_ITEMS" :key="item.name" class="modal-row">
            <div><div class="modal-row-label">{{ item.name }}</div><div v-if="item.sub" class="modal-row-sub">{{ item.sub }}</div></div>
          </div>
          <div class="modal-section">🍽️ Comida (alternar)</div>
          <div class="modal-row"><div><div class="modal-row-label">Honest Greens</div><div class="modal-row-sub">Bowl cereal + proteína magra · sin salsas cremosas</div></div></div>
          <div class="modal-row"><div><div class="modal-row-label">ApetEat</div><div class="modal-row-sub">Pedir antes 11h · legumbre + proteína magra</div></div></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/useAppStore'

defineProps({ open: Boolean })
defineEmits(['close'])

const desp    = useAppStore()
const CATS    = desp.cats
const mainTab = ref('casa')
const subTab  = ref('stock')

function byCat(items, catId) {
  return items.filter(i => i.cat === catId)
}

const OFICINA_ITEMS = [
  { name: 'Copos de avena' },
  { name: 'Leche de soja' },
  { name: 'Plátano · Mandarinas · Peras' },
  { name: 'Yogur La Fageda' },
  { name: 'Anacardos salados · Nueces' },
  { name: 'Café' },
]
</script>

<style scoped>
.btn-comprar {
  background: var(--md-warning-container); color: var(--md-warning);
  border: 1px solid var(--md-warning); padding: 6px 12px;
  border-radius: 100px; cursor: pointer; font-size: 12px; font-weight: 600;
  white-space: nowrap; flex-shrink: 0;
}
.btn-all {
  width: 100%; padding: 11px; background: #10A46A; color: #fff;
  border: none; border-radius: 8px; font-size: 13px; font-weight: 600;
  cursor: pointer; margin-bottom: 8px;
}
.compra-check {
  width: 22px; height: 22px; border-radius: 50%;
  border: 2px solid #ddd; background: transparent;
  display: flex; align-items: center; justify-content: center;
  margin-right: 12px; flex-shrink: 0;
}
.compra-check.bought { background: #10A46A; border-color: #10A46A; }
</style>
