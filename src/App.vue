<template>
  <router-view />
  <nav v-if="!esLogin" class="bottom-nav">
    <button
      v-for="item in navItems"
      :key="item.path"
      class="nav-btn"
      :class="{ active: route.path === item.path }"
      @click="router.push(item.path)"
    >
      <div class="nav-indicator">
        <div class="nav-icon">{{ item.icon }}</div>
      </div>
      <div class="nav-label">{{ item.label }}</div>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route   = useRoute()
const router  = useRouter()
const esLogin = computed(() => route.path === '/login')

const navItems = [
  { path: '/hoy',     icon: '☀️',  label: 'Hoy'      },
  { path: '/nutri',   icon: '🍽️',  label: 'Nutrición' },
  { path: '/plan',    icon: '🏃',  label: 'Plan'     },
  { path: '/medidas', icon: '📏',  label: 'Medidas'  },
]
</script>
