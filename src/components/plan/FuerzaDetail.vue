<template>
  <div class="fuerza-card">
    <div class="fuerza-title">{{ data.title }}</div>
    <div class="fuerza-grid">
      <div v-for="ex in data.exercises" :key="ex.name" class="fuerza-ex">
        {{ ex.icon }} {{ ex.name }}<br>
        <span class="fuerza-detail">{{ ex.detail }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ data: Object })
</script>

<style scoped>
.fuerza-card {
  background: var(--md-surface); border: 1px solid var(--md-outline-variant);
  border-radius: 12px; padding: 14px; margin-bottom: 10px;
}
.fuerza-title { font-weight: 700; font-size: 13px; margin-bottom: 10px; }
.fuerza-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12px; }
.fuerza-ex    { background: #f5f5f5; border-radius: 8px; padding: 8px; line-height: 1.4; }
.fuerza-detail { color: #888; }
</style>
