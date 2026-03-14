# Smailing · Migration Status
## De single-file HTML → Vue 3 + Pinia app

### Fichero de referencia
`smailing.html` — HTML monolítico original (commit 37c8f88, mar 2026).
Úsalo como ground truth visual y de datos durante la migración.

---

## Sesiones

### ✅ Sesión 1 · Scaffolding + Store
**Estado:** Completada

**Tareas:**
- [x] Recuperar `smailing.html` del historial git como referencia
- [x] Verificar dependencias (`vue`, `pinia`, `vue-router`, `@supabase/supabase-js`)
- [x] Verificar estructura de carpetas
  ```
  src/
    assets/
    components/hoy/   medidas/   nutri/   plan/
    composables/
    data/             ← datos estáticos (nutrition, plan, medidas, despensa)
    lib/              ← supabase client
    router/
    stores/           ← auth, checklist, despensa + nuevo useAppStore
    views/
  ```
- [x] Crear `src/stores/useAppStore.js` — store unificada con todos los datos

**Store unificada expone:**
- Datos nutri: `weekPlan`, `dayChips`
- Datos entrenamiento: `races`, `phases`, `currentWeek`
- Datos medidas: `medidasData`, `garmin`, `pesoRegistros`
- Datos despensa: `cats`, `pantryItems`, `needsBuying`
- Estado UI: `nutriActiveDay`, `chartView`
- Checklist (con persistencia localStorage): `isChecked`, `toggleCheck`, `resetChecklist`
- Despensa interactiva: `inDesp`, `inCompra`, `moveToCompra`, `toggleBought`, `markAllBought`, `isBought`

---

### ⏳ Sesión 2 · Migrar vistas a useAppStore
**Estado:** Pendiente

**Tareas:**
- [ ] `HoyView.vue` — reemplazar import de `@/data/nutrition` + `useChecklistStore` por `useAppStore`
- [ ] `NutriView.vue` — reemplazar import de `@/data/nutrition` por `useAppStore`
- [ ] `PlanView.vue` — reemplazar import de `@/data/plan` por `useAppStore`
- [ ] `MedidasView.vue` — reemplazar import de `@/data/medidas` + estado local por `useAppStore`
- [ ] `DespensaModal.vue` — reemplazar `useDespensaStore` por `useAppStore`
- [ ] Eliminar stores obsoletas: `stores/checklist.js`, `stores/despensa.js`

---

### ⏳ Sesión 3 · Componentes pendientes + pulido
**Estado:** Pendiente

**Tareas:**
- [ ] Revisar `WeightChart.vue` en medidas/ (actualmente en hoy/)
- [ ] Revisar `BottomSheet.vue` (duplicado en hoy/ y medidas/)
- [ ] Asegurar CSS global en `assets/main.css` (colores, cards, nav)
- [ ] Test en móvil (iOS Safari + Android Chrome)
- [ ] Verificar build de producción (`npm run build`)

---

### ⏳ Sesión 4 · Supabase + Auth
**Estado:** Pendiente

**Tareas:**
- [ ] Mover datos de peso/medidas a tabla Supabase
- [ ] Sincronizar checklist con Supabase (offline-first)
- [ ] Gestión de sesión con `useAuthStore`

---

## Dependencias actuales
```json
"dependencies": {
  "@supabase/supabase-js": "^2.49.2",
  "pinia": "^2.3.1",
  "vue": "^3.5.13",
  "vue-router": "^4.5.0"
}
```
Sin dependencias adicionales en Sesión 1.
