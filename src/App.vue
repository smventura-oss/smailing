<template>
  <router-view v-slot="{ Component }">
    <transition name="screen" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <nav v-if="showNav" class="bottom-nav">
    <button
      v-for="item in NAV_ITEMS"
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

const route  = useRoute()
const router = useRouter()

const NAV_ITEMS = [
  { path: '/hoy',     icon: '☀️',  label: 'Hoy'      },
  { path: '/nutri',   icon: '🍽️',  label: 'Nutrición' },
  { path: '/plan',    icon: '🏃',  label: 'Plan'      },
  { path: '/medidas', icon: '📏',  label: 'Medidas'   },
]

const showNav = computed(() => route.meta.requiresAuth)
</script>

<style>
.screen-enter-active, .screen-leave-active { transition: opacity 200ms ease, transform 200ms ease; }
.screen-enter-from { opacity: 0; transform: translateY(6px); }
.screen-leave-to   { opacity: 0; transform: translateY(-4px); }
</style>
