<template>
  <div class="macro-bar">
    <div class="mb-top">
      <span class="mb-label">{{ macro.emoji }} {{ macro.label }}</span>
      <span class="mb-val">{{ macro.actual }}<small> / {{ macro.obj }}{{ macro.unit }}</small></span>
    </div>
    <div class="mb-track">
      <div class="mb-fill" :style="{ width: pct + '%', background: macro.color }" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ macro: { type: Object, required: true } })
const pct = computed(() => Math.min(100, Math.round((props.macro.actual / props.macro.obj) * 100)))
</script>

<style scoped>
.macro-bar { display: flex; flex-direction: column; gap: 4px; }
.mb-top { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-2); }
.mb-label { font-weight: 600; }
.mb-val { font-weight: 700; color: var(--text); }
.mb-val small { font-weight: 400; color: var(--text-3); }
.mb-track { height: 5px; background: #e8e8e8; border-radius: 3px; overflow: hidden; }
.mb-fill { height: 100%; border-radius: 3px; transition: width 600ms cubic-bezier(.4,0,.2,1); }
</style>
