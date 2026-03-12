import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HoyView from '../views/HoyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login',   component: () => import('../views/LoginView.vue'), meta: { public: true } },
    { path: '/',        redirect: '/hoy' },
    { path: '/hoy',     component: HoyView },
    { path: '/nutri',   component: () => import('../views/NutriView.vue') },
    { path: '/plan',    component: () => import('../views/PlanView.vue') },
    { path: '/medidas', component: () => import('../views/MedidasView.vue') },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.public) return true

  const auth = useAuthStore()
  if (!auth.user) await auth.fetchUser()
  if (!auth.user) return '/login'
})

export default router
