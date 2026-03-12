<template>
  <div class="check-item" :class="{ done: item.done }" @click="$emit('toggle', item.id)">
    <div class="check-box" :class="{ checked: item.done }">
      <span v-if="item.done">✓</span>
    </div>
    <span class="check-emoji">{{ item.emoji }}</span>
    <span class="check-label">{{ item.label }}</span>
  </div>
</template>
<script setup>
defineProps({ item: Object })
defineEmits(['toggle'])
</script>
<style scoped>
.check-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: opacity 200ms; min-height: 44px; }
.check-item:last-child { border-bottom: none; }
.check-item.done { opacity: .5; }
.check-box { width: 22px; height: 22px; border-radius: 6px; border: 2px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0; transition: background 200ms, border-color 200ms; }
.check-box.checked { background: var(--green); border-color: var(--green); }
.check-emoji { font-size: 18px; flex-shrink: 0; }
.check-label { font-size: 15px; font-weight: 500; }
</style>
