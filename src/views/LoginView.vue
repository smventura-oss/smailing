<template>
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-logo">🏃</div>
      <div class="login-title">Smailing</div>
      <div class="login-sub">Tu app de entrenamiento</div>

      <form @submit.prevent="submit">
        <div class="login-field">
          <label>Email</label>
          <input v-model="email" type="email" autocomplete="email" placeholder="tu@email.com" required />
        </div>
        <div class="login-field">
          <label>Contraseña</label>
          <input v-model="password" type="password" autocomplete="current-password" placeholder="••••••••" required />
        </div>

        <div v-if="error" class="login-error">{{ error }}</div>

        <button class="login-btn" :disabled="loading">
          {{ loading ? 'Entrando…' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router   = useRouter()
const email    = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)

async function submit() {
  error.value   = ''
  loading.value = true
  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (err) { error.value = err.message; return }
  router.replace('/hoy')
}
</script>

<style scoped>
.login-wrap {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: var(--md-background); padding: 24px;
}
.login-card {
  background: #fff; border-radius: 16px; padding: 32px 24px;
  width: 100%; max-width: 360px; box-shadow: 0 4px 24px rgba(0,0,0,.08);
}
.login-logo  { font-size: 48px; text-align: center; margin-bottom: 8px; }
.login-title { font-size: 24px; font-weight: 800; text-align: center; color: #111; letter-spacing: -.5px; }
.login-sub   { font-size: 14px; color: #888; text-align: center; margin-bottom: 28px; }
.login-field { margin-bottom: 16px; }
.login-field label { display: block; font-size: 12px; font-weight: 600; color: #555; margin-bottom: 6px; }
.login-field input {
  width: 100%; padding: 12px 14px; border: 1.5px solid #e0e0e0;
  border-radius: 10px; font-size: 15px; outline: none;
  transition: border-color 150ms ease;
}
.login-field input:focus { border-color: #10A46A; }
.login-error { background: #fde8e8; color: #9b2a2a; border-radius: 8px; padding: 10px 12px; font-size: 13px; margin-bottom: 14px; }
.login-btn {
  width: 100%; padding: 14px; background: #10A46A; color: #fff;
  border: none; border-radius: 10px; font-size: 16px; font-weight: 700;
  cursor: pointer; transition: opacity 150ms ease;
}
.login-btn:disabled { opacity: .6; cursor: not-allowed; }
</style>
