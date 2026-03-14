import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user    = ref(null)
  const loading = ref(true)   // true until first session check completes

  // ── init ─────────────────────────────────────────────────────────────
  // Call once from main.js after pinia is installed.
  // Checks current session and subscribes to auth state changes.
  async function init() {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user ?? null
    loading.value = false

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  // ── signIn ────────────────────────────────────────────────────────────
  async function signIn(email, password) {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    loading.value = false
    return error   // null on success, AuthError on failure
  }

  // ── signOut ───────────────────────────────────────────────────────────
  async function signOut() {
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, loading, init, signIn, signOut }
})
