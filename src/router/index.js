import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',        redirect: '/hoy' },
    { path: '/login',   component: () => import('@/views/LoginView.vue'), meta: { public: true } },
    { path: '/hoy',     component: () => import('@/views/HoyView.vue'),     meta: { requiresAuth: true } },
    { path: '/nutri',   component: () => import('@/views/NutriView.vue'),   meta: { requiresAuth: true } },
    { path: '/plan',    component: () => import('@/views/PlanView.vue'),    meta: { requiresAuth: true } },
    { path: '/medidas', component: () => import('@/views/MedidasView.vue'), meta: { requiresAuth: true } },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'instant' }
  },
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true
  const { data } = await supabase.auth.getSession()
  if (!data.session) return '/login'
})

export default router
