<template>
  <div :id="meal.id" class="meal" :class="{ collapsed }">
    <div class="meal-head" @click="collapsed = !collapsed">
      <div class="meal-left">
        <span class="meal-time">{{ meal.time }}</span>
        <span class="meal-name">{{ meal.name }}</span>
      </div>
      <span class="meal-kcal">{{ meal.kcal }}</span>
    </div>
    <div class="meal-body">
      <div v-for="ing in meal.items" :key="ing.name" class="ing">
        <span>{{ ing.name }}</span>
        <span class="ing-g">{{ ing.qty }}</span>
      </div>
      <div v-if="meal.note" class="meal-note">{{ meal.note }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ meal: Object })
const collapsed = ref(false)
</script>
