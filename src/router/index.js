import { createRouter, createWebHistory } from 'vue-router'
import HoyView from '../views/HoyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login',   component: () => import('../views/LoginView.vue') },
    { path: '/',        redirect: '/hoy' },
    { path: '/hoy',     component: HoyView },
    { path: '/nutri',   component: () => import('../views/NutriView.vue') },
    { path: '/plan',    component: () => import('../views/PlanView.vue') },
    { path: '/medidas', component: () => import('../views/MedidasView.vue') },
  ],
})

export default router
