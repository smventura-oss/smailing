import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)

  async function fetchUser() {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  }

  async function signIn(email, password) {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    loading.value = false
    if (error) throw error
    user.value = data.user
  }

  async function signUp(email, password) {
    loading.value = true
    const { error } = await supabase.auth.signUp({ email, password })
    loading.value = false
    if (error) throw error
  }

  async function signOut() {
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, loading, fetchUser, signIn, signUp, signOut }
})
