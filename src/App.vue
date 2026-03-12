<template>
  <router-view />
  <nav class="app-nav">
    <button
      v-for="item in navItems"
      :key="item.path"
      class="nav-btn"
      :class="{ active: route.path === item.path }"
      @click="router.push(item.path)"
    >
      <span class="icon">{{ item.icon }}</span>
      {{ item.label }}
    </button>
  </nav>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
const route  = useRoute()
const router = useRouter()
const navItems = [
  { path: '/hoy',     icon: '☀️',  label: 'Hoy'     },
  { path: '/nutri',   icon: '🥗',  label: 'Nutri'   },
  { path: '/plan',    icon: '📅',  label: 'Plan'    },
  { path: '/medidas', icon: '📊',  label: 'Medidas' },
]
</script>
