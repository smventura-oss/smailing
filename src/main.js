import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useAuthStore } from '@/stores/auth'

const app   = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth session (non-blocking — router guard handles redirects)
useAuthStore().init()

app.mount('#app')
