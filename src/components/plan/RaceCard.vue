<template>
  <div class="race-card">
    <div class="rc-head">
      <div class="rc-title">{{ race.title }}</div>
      <div class="rc-date">{{ race.date }}</div>
      <div class="rc-badges">
        <span v-for="b in race.badges" :key="b.text" class="tag" :class="b.cls">{{ b.text }}</span>
      </div>
    </div>
    <div class="rc-stats" :class="race.statsClass">
      <div v-for="s in race.stats" :key="s.lbl" class="rc-stat">
        <div class="rs-val" :style="{ color: s.color }">{{ s.val }}</div>
        <div class="rs-lbl">{{ s.lbl }}</div>
      </div>
    </div>
    <div class="rc-body">
      <p class="strategy" v-html="race.strategy" />
      <div class="prob-toggle" @click="open = !open">
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="prob-circle" :style="{ background: race.prob.bgColor, color: race.prob.color }">
            {{ race.prob.pct }}%
          </div>
          <div>
            <div class="prob-lbl">{{ race.prob.lbl }}</div>
            <div class="prob-sub">{{ race.prob.sub }}</div>
          </div>
        </div>
        <div class="prob-arrow" :style="{ transform: open ? 'rotate(180deg)' : '' }">▾</div>
      </div>
      <div class="prob-panel" :class="{ open }">
        <div class="prob-before-after">
          <span class="prob-old">{{ race.prob.pctOld }}%</span>
          <span style="color:#888;">→</span>
          <span class="prob-new">{{ race.prob.pct }}%</span>
        </div>
        <div class="prob-bar-track">
          <div class="prob-bar-fill" :style="{ width: race.prob.pct + '%', background: race.prob.color }" />
        </div>
        <div class="prob-bar-labels">
          <span>0%</span>
          <span :style="{ color: race.prob.color, fontWeight: 700 }">{{ race.prob.pct }}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ race: Object })
const open = ref(false)
</script>
