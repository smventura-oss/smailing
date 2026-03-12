<template>
  <div class="login-wrap">
    <div class="login-logo">
      <span class="logo-icon">💪</span>
      <h1 class="logo-title">smailing</h1>
      <p class="logo-sub">Tu entrenamiento, tu datos</p>
    </div>

    <div class="login-card">
      <div class="login-tabs">
        <button
          class="tab-btn"
          :class="{ active: modo === 'login' }"
          @click="modo = 'login'"
        >Entrar</button>
        <button
          class="tab-btn"
          :class="{ active: modo === 'registro' }"
          @click="modo = 'registro'"
        >Crear cuenta</button>
      </div>

      <form @submit.prevent="submit">
        <div class="field">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            autocomplete="email"
            required
          />
        </div>
        <div class="field">
          <label>Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            required
            minlength="6"
          />
        </div>
        <div v-if="modo === 'registro'" class="field">
          <label>Confirmar contraseña</label>
          <input
            v-model="passwordConfirm"
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
            required
            minlength="6"
          />
        </div>

        <p v-if="error" class="login-error">{{ error }}</p>
        <p v-if="mensaje" class="login-ok">{{ mensaje }}</p>

        <button type="submit" class="btn-primary" :disabled="cargando">
          <span v-if="cargando">...</span>
          <span v-else-if="modo === 'login'">Entrar</span>
          <span v-else>Crear cuenta</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth   = useAuthStore()

const modo            = ref('login')
const email           = ref('')
const password        = ref('')
const passwordConfirm = ref('')
const error           = ref('')
const mensaje         = ref('')
const cargando        = ref(false)

async function submit() {
  error.value   = ''
  mensaje.value = ''

  if (modo.value === 'registro' && password.value !== passwordConfirm.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  cargando.value = true
  try {
    if (modo.value === 'login') {
      await auth.signIn(email.value, password.value)
      router.push('/hoy')
    } else {
      await auth.signUp(email.value, password.value)
      mensaje.value = 'Revisa tu email para confirmar tu cuenta.'
    }
  } catch (e) {
    error.value = e.message || 'Error desconocido.'
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.login-wrap {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 20px 40px;
  background: var(--bg);
}

.login-logo {
  text-align: center;
  margin-bottom: 36px;
}
.logo-icon { font-size: 48px; display: block; margin-bottom: 8px; }
.logo-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--text-1);
  margin: 0 0 6px;
}
.logo-sub { font-size: 14px; color: var(--text-2); margin: 0; }

.login-card {
  width: 100%;
  max-width: 380px;
  background: var(--card);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,.07);
}

.login-tabs {
  display: flex;
  gap: 4px;
  background: #f0f0f0;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 24px;
}
.tab-btn {
  flex: 1;
  border: none;
  background: transparent;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-2);
  cursor: pointer;
  transition: background 200ms, color 200ms;
}
.tab-btn.active {
  background: #fff;
  color: var(--text-1);
  box-shadow: 0 1px 4px rgba(0,0,0,.1);
}

.field {
  margin-bottom: 16px;
}
.field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  margin-bottom: 6px;
}
.field input {
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  background: #fafafa;
  color: var(--text-1);
  outline: none;
  transition: border-color 200ms;
  box-sizing: border-box;
}
.field input:focus { border-color: var(--green); background: #fff; }

.login-error {
  font-size: 13px;
  color: #e53935;
  background: #ffeaea;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 14px;
}
.login-ok {
  font-size: 13px;
  color: #2e7d32;
  background: #e8f5e9;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 14px;
}

.btn-primary {
  width: 100%;
  padding: 13px;
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 200ms;
}
.btn-primary:disabled { opacity: .6; cursor: not-allowed; }
.btn-primary:not(:disabled):active { opacity: .85; }
</style>
