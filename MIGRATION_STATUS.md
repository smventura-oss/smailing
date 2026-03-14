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

### ✅ Sesión 2 · Migrar vistas a useAppStore
**Estado:** Completada · build ✓

**Tareas:**
- [x] `HoyView.vue` — reemplazar import de `@/data/nutrition` + `useChecklistStore` por `useAppStore`
- [x] `NutriView.vue` — reemplazar import de `@/data/nutrition` por `useAppStore`
- [x] `PlanView.vue` — reemplazar import de `@/data/plan` por `useAppStore`
- [x] `MedidasView.vue` — reemplazar import de `@/data/medidas` + estado local por `useAppStore`
- [x] `DespensaModal.vue` — reemplazar `useDespensaStore` + `CATS` por `useAppStore`
- [x] Eliminar stores obsoletas: `stores/checklist.js`, `stores/despensa.js`

---

### ✅ Sesión 3 · Componentes pendientes + pulido
**Estado:** Completada · build ✓

**Tareas:**
- [x] Migrar `WeightChart.vue` (medidas/) de `@/data/medidas` → `useAppStore`
- [x] `BottomSheet.vue` — sin duplicado confirmado; solo existe en `medidas/`
- [x] Eliminar carpeta `components/hoy/` (estaba vacía)
- [x] CSS global `assets/main.css` — completo para la implementación actual
      (47 clases del HTML monolítico son obsoletas; todas reemplazadas por `.fuerza-*`, `.meal-*`, etc.)
- [x] Build de producción: ✓ 95 módulos, 0 errores

**Resultado:** cero imports directos de `@/data/` fuera de `useAppStore.js`

---

### ✅ Sesión 4 · Supabase + Auth
**Estado:** Completada · build ✓ (96 módulos)

**Tareas:**
- [x] `useAuthStore` — `init()` + `signIn()` + `onAuthStateChange` listener
- [x] `main.js` — llama `useAuthStore().init()` tras montar pinia
- [x] `LoginView.vue` — usa `auth.signIn()` en lugar de llamada directa a supabase
- [x] `useAppStore` — `pesoRegistros` ahora es `ref` reactivo
  - `loadPesoRegistros()` — fetch de tabla `peso_registros` desde Supabase
  - `addPesoRegistro(fecha, peso)` — upsert a Supabase + actualiza estado local
  - `toggleCheck` — sincroniza a `checklist_state` en background (offline-first)
  - `loadChecklistFromSupabase()` — carga estado de hoy y fusiona con localStorage
- [x] `WeightChart.vue` — accede al store reactivamente (`store.pesoRegistros`)
- [x] `MedidasView.vue` — llama `loadPesoRegistros()` en `onMounted`
- [x] `HoyView.vue` — llama `loadChecklistFromSupabase()` en `onMounted`
- [x] `supabase/migrations/001_initial_schema.sql` — tablas con RLS:
  - `peso_registros` (unique por user+fecha)
  - `medidas` (unique por user+fecha+metrica)
  - `checklist_state` (PK compuesta user+fecha+item_id)

**Para activar en producción:** ejecutar `001_initial_schema.sql` en el SQL Editor de Supabase.

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
