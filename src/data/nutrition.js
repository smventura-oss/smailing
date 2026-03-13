// Weekly nutrition plan — 7 days (0=Mon … 6=Sun)
// Each day has: type, badge, kcal, deficit, macros, meals[], supplements[], notes[]

export const WEEK_PLAN = [
  // ── D0: LUNES — Descanso ──────────────────────────────
  {
    dayIndex: 0,
    tipo: 'descanso',
    badge: { cls: 'b-rest', text: '😴 Descanso' },
    kcal: '1.750',
    deficit: 'déficit −300',
    macros: [{ val: '110g', lbl: 'Prot.' }, { val: '220g', lbl: 'Carbos' }, { val: '58g', lbl: 'Grasa' }],
    meals: [
      {
        id: 'meal-d0-desayuno', time: '08:00h', name: 'DESAYUNO', kcal: '~500 kcal',
        items: [
          { name: 'Copos de avena', qty: '60g' },
          { name: 'Leche de soja', qty: '250ml' },
          { name: 'Plátano', qty: '1 ud' },
          { name: 'Nueces peladas', qty: '20g' },
          { name: 'Café', qty: '1 taza' },
        ],
      },
      {
        id: 'meal-d0-comida', time: '13:00h', name: 'COMIDA', kcal: '~620 kcal',
        items: [
          { name: 'Lentejas pardinas', qty: '90g' },
          { name: 'Zanahoria', qty: '100g' },
          { name: 'Pimientos y cebolla', qty: '100g' },
          { name: 'Aceite de oliva', qty: '10ml' },
        ],
      },
      {
        id: 'meal-d0-merienda', time: '17:00h', name: 'MERIENDA', kcal: '~280 kcal',
        items: [
          { name: 'Kéfir casero', qty: '200ml' },
          { name: 'Pera', qty: '1 ud' },
          { name: 'Anacardos naturales', qty: '20g' },
        ],
      },
      {
        id: 'meal-d0-cena', time: '20:30h', name: 'CENA', kcal: '~560 kcal',
        items: [
          { name: 'Merluza al horno', qty: '160g' },
          { name: 'Patata cocida', qty: '120g' },
          { name: 'Brócoli al vapor', qty: '150g' },
          { name: 'Aceite de oliva', qty: '10ml' },
        ],
      },
    ],
    supplements: [
      { name: 'Malato + D3 + K2 + B12', when: 'Desayuno' },
      { name: 'Bisglicinato de magnesio', when: 'Cena' },
    ],
    notes: [],
  },

  // ── D1: MARTES — Oficina ──────────────────────────────
  {
    dayIndex: 1,
    tipo: 'oficina',
    badge: { cls: 'b-rest', text: '🏢 Oficina — sin entreno' },
    kcal: '1.700',
    deficit: 'déficit −350',
    macros: [{ val: '115g', lbl: 'Prot.' }, { val: '210g', lbl: 'Carbos' }, { val: '55g', lbl: 'Grasa' }],
    meals: [
      {
        id: 'meal-d1-desayuno', time: '08:00h · oficina', name: 'DESAYUNO', kcal: '~480 kcal',
        items: [
          { name: 'Copos de avena · oficina', qty: '60g' },
          { name: 'Leche de soja · oficina', qty: '250ml' },
          { name: 'Plátano · oficina', qty: '1 ud' },
          { name: 'Anacardos salados · oficina', qty: '20g' },
          { name: 'Café · oficina', qty: '1 taza' },
        ],
      },
      {
        id: 'meal-d1-comida', time: '13:30h · oficina', name: 'COMIDA', kcal: '~600 kcal',
        items: [{ name: 'Honest Greens o ApetEat', qty: '1 plato' }],
        note: '🥗 Alternar HG y ApetEat.',
      },
      {
        id: 'meal-d1-merienda', time: '17:00h · oficina', name: 'MERIENDA', kcal: '~220 kcal',
        items: [
          { name: 'Yogur La Fageda · oficina', qty: '1 ud' },
          { name: 'Mandarina · oficina', qty: '1 ud' },
          { name: 'Nueces · oficina', qty: '20g' },
        ],
      },
      {
        id: 'meal-d1-cena', time: '20:30h', name: 'CENA', kcal: '~560 kcal',
        items: [
          { name: 'Salmón a la plancha', qty: '180g' },
          { name: 'Patata cocida', qty: '130g' },
          { name: 'Ensalada brotes tiernos', qty: '100g' },
        ],
      },
    ],
    supplements: [
      { name: 'Malato + D3 + K2 + B12', when: 'Desayuno (en oficina)' },
      { name: 'Bisglicinato de magnesio', when: 'Cena' },
    ],
    notes: [],
  },

  // ── D2: MIÉRCOLES — Fuerza A ──────────────────────────
  {
    dayIndex: 2,
    tipo: 'fuerza',
    badge: { cls: 'b-str', text: '💪 Fuerza garaje A · Tren inferior · 20h' },
    badgeExtra: { style: 'background:#e8f5e9;color:#2e7d32;', text: '✅ Completada · 23min · FC 103 · BB−1 · RPE 2/10' },
    kcal: '1.850',
    deficit: 'déficit −350',
    macros: [{ val: '130g', lbl: 'Prot.' }, { val: '235g', lbl: 'Carbos' }, { val: '60g', lbl: 'Grasa' }],
    meals: [
      {
        id: 'meal-d2-desayuno', time: '08:00h', name: 'DESAYUNO', kcal: '~500 kcal',
        items: [
          { name: 'Muesli de frutas', qty: '60g' },
          { name: 'Leche de soja', qty: '250ml' },
          { name: 'Plátano', qty: '1 ud' },
          { name: 'Nueces peladas', qty: '20g' },
        ],
      },
      {
        id: 'meal-d2-comida', time: '13:00h', name: 'COMIDA', kcal: '~640 kcal',
        items: [
          { name: 'Pollo al horno', qty: '200g' },
          { name: 'Quinoa cocida', qty: '70g' },
          { name: 'Calabacín salteado', qty: '150g' },
        ],
      },
      {
        id: 'meal-d2-merienda', time: '17:00h', name: 'MERIENDA', kcal: '~280 kcal',
        items: [
          { name: 'Yogur griego ligero', qty: '150g' },
          { name: 'Pera', qty: '1 ud' },
        ],
      },
      {
        id: 'meal-d2-cena', time: '21:00h · post fuerza', name: 'CENA', kcal: '~580 kcal',
        items: [
          { name: 'Dorada al horno', qty: '180g' },
          { name: 'Patata cocida', qty: '130g' },
          { name: 'Brócoli al vapor', qty: '150g' },
        ],
      },
    ],
    supplements: [
      { name: 'Malato + D3 + K2 + B12', when: 'Desayuno' },
      { name: 'Colágeno 15g + zumo naranja', when: '90 min pre-entreno (~18:30h)' },
      { name: 'Bisglicinato de magnesio', when: 'Cena' },
    ],
    notes: [{ cls: 'blue', text: '💪 Garaje 20h — Joy duerme ~19:30h.' }],
  },

  // ── D3: JUEVES — Fuerza B ─────────────────────────────
  {
    dayIndex: 3,
    tipo: 'fuerza',
    badge: { cls: 'b-str', text: '💪 Fuerza garaje B · Tren superior + core · 20h' },
    kcal: '1.850',
    deficit: 'déficit −350',
    macros: [{ val: '130g', lbl: 'Prot.' }, { val: '235g', lbl: 'Carbos' }, { val: '60g', lbl: 'Grasa' }],
    warningNote: '⚠️ <strong>Training Status: Strained · BB 27 · HRV 30ms Low</strong> — si esta mañana BB &lt;35, sustituir por movilidad/foam roller.',
    meals: [
      {
        id: 'meal-d3-desayuno', time: '08:00h', name: 'DESAYUNO', kcal: '~500 kcal',
        items: [
          { name: 'Muesli de frutas', qty: '60g' },
          { name: 'Leche de soja', qty: '250ml' },
          { name: 'Plátano', qty: '1 ud' },
          { name: 'Nueces peladas', qty: '20g' },
        ],
      },
      {
        id: 'meal-d3-comida', time: '13:00h', name: 'COMIDA', kcal: '~640 kcal',
        items: [
          { name: 'Tofu firme salteado', qty: '200g' },
          { name: 'Arroz integral', qty: '70g' },
          { name: 'Mix de setas', qty: '150g' },
        ],
      },
      {
        id: 'meal-d3-merienda', time: '17:00h', name: 'MERIENDA', kcal: '~280 kcal',
        items: [
          { name: 'Kéfir casero', qty: '150ml' },
          { name: 'Mandarina', qty: '1 ud' },
          { name: 'Anacardos naturales', qty: '20g' },
        ],
      },
      {
        id: 'meal-d3-cena', time: '21:00h · post fuerza', name: 'CENA', kcal: '~580 kcal',
        items: [
          { name: 'Salmón al horno', qty: '180g' },
          { name: 'Batata al horno', qty: '150g' },
          { name: 'Champiñones salteados', qty: '120g' },
        ],
      },
    ],
    supplements: [
      { name: 'Malato + D3 + K2 + B12', when: 'Desayuno' },
      { name: 'Colágeno 15g + zumo naranja', when: '90 min pre-entreno (~18:30h)' },
      { name: 'Bisglicinato de magnesio', when: 'Cena' },
    ],
    notes: [],
  },

  // ── D4: VIERNES — Rodaje ──────────────────────────────
  {
    dayIndex: 4,
    tipo: 'rodaje',
    badge: { cls: 'b-run', text: '🏃 Rodaje Z1-Z2 · 6 km · FC <150 · ~19h' },
    kcal: '1.950',
    deficit: 'déficit −300',
    macros: [{ val: '130g', lbl: 'Prot.' }, { val: '250g', lbl: 'Carbos' }, { val: '62g', lbl: 'Grasa' }],
    warningNote: '⚠️ <strong>Primer rodaje post-resfriado · Strained.</strong> FC &lt;150 estricto. Si no te encuentras bien, 30 min caminata Z1.',
    meals: [
      {
        id: 'meal-d4-desayuno', time: '08:00h', name: 'DESAYUNO', kcal: '~500 kcal',
        items: [
          { name: 'Muesli de frutas', qty: '60g' },
          { name: 'Leche de soja', qty: '250ml' },
          { name: 'Plátano', qty: '1 ud' },
          { name: 'Nueces peladas', qty: '20g' },
        ],
      },
      {
        id: 'meal-d4-comida', time: '13:00h', name: 'COMIDA', kcal: '~640 kcal',
        items: [
          { name: 'Pechuga de pollo', qty: '200g' },
          { name: 'Pasta integral', qty: '80g' },
          { name: 'Ensalada brotes tiernos', qty: '80g' },
        ],
        note: '💡 Come antes de las 14h — margen antes del rodaje.',
      },
      {
        id: 'meal-d4-merienda', time: '17:30h', name: 'MERIENDA', kcal: '~300 kcal',
        items: [
          { name: 'Kéfir casero', qty: '150ml' },
          { name: 'Mandarina', qty: '1 ud' },
          { name: 'Anacardos naturales', qty: '20g' },
        ],
        note: '⚡ Colágeno 90 min pre-rodaje (~17:30h).',
      },
      {
        id: 'meal-d4-cena', time: '20:30h · post rodaje', name: 'CENA', kcal: '~560 kcal',
        items: [
          { name: 'Huevos revueltos propios', qty: '3 uds' },
          { name: 'Tostadas pan integral', qty: '2 rebanadas' },
          { name: 'Tomates cherry', qty: '80g' },
        ],
      },
    ],
    supplements: [
      { name: 'Malato + D3 + K2 + B12', when: 'Desayuno' },
      { name: 'Colágeno 15g + zumo naranja', when: '90 min pre-rodaje (~17:30h)' },
      { name: 'Bisglicinato de magnesio', when: 'Cena' },
    ],
    notes: [{ cls: 'blue', text: '💧 FC <150 estricto. Z1-Z2. Primer rodaje post-resfriado.' }],
  },

  // ── D5: SÁBADO — Tirada ───────────────────────────────
  {
    dayIndex: 5,
    tipo: 'tirada',
    badge: { cls: 'b-long', text: '🏔️ Tirada trail Z2 · 10-12 km · FC <155 · 15h' },
    kcal: '2.300',
    deficit: 'déficit −250',
    macros: [{ val: '140g', lbl: 'Prot.' }, { val: '340g', lbl: 'Carbos' }, { val: '70g', lbl: 'Grasa' }],
    meals: [
      {
        id: 'meal-d5-desayuno', time: '09:00h', name: 'DESAYUNO', kcal: '~620 kcal',
        items: [
          { name: 'Muesli de frutas', qty: '65g' },
          { name: 'Leche de soja', qty: '250ml' },
          { name: 'Plátano', qty: '1 ud' },
          { name: 'Nueces peladas', qty: '25g' },
        ],
        note: '⚡ Desayuno grande 3h antes de salir.',
      },
      {
        id: 'meal-d5-comida', time: '12:00h', name: 'COMIDA PRE-TIRADA', kcal: '~480 kcal',
        items: [
          { name: 'Tortillas integrales', qty: '2 uds' },
          { name: 'Hummus', qty: '80g' },
          { name: 'Aguacate', qty: '1/2 ud' },
          { name: 'Huevo duro propio', qty: '1 ud' },
        ],
      },
      {
        id: 'meal-d5-merienda', time: '17:30h · post tirada', name: 'MERIENDA', kcal: '~370 kcal',
        items: [
          { name: 'Kéfir casero', qty: '150ml' },
          { name: 'Plátano', qty: '1 ud' },
          { name: 'Anacardos naturales', qty: '30g' },
        ],
        note: '⚡ Come en 30-45 min post-tirada.',
      },
      {
        id: 'meal-d5-cena', time: '20:30h', name: 'CENA', kcal: '~700 kcal',
        items: [
          { name: 'Salmón al horno', qty: '200g' },
          { name: 'Batata al horno', qty: '200g' },
          { name: 'Brócoli al vapor', qty: '150g' },
        ],
      },
    ],
    supplements: [
      { name: 'Malato + D3 + K2 + B12', when: 'Desayuno' },
      { name: 'Colágeno 15g + zumo naranja', when: '90 min pre-tirada (~13:30h)' },
      { name: 'Bisglicinato de magnesio', when: 'Cena' },
    ],
    notes: [{ cls: 'blue', text: '💧 2.5L + sales en ruta. Sin forzar — recuperación post-resfriado.' }],
  },

  // ── D6: DOMINGO — Descanso ────────────────────────────
  {
    dayIndex: 6,
    tipo: 'descanso',
    badge: { cls: 'b-rest', text: '😴 Descanso — familia' },
    kcal: '1.650',
    deficit: 'déficit −400',
    macros: [{ val: '120g', lbl: 'Prot.' }, { val: '205g', lbl: 'Carbos' }, { val: '52g', lbl: 'Grasa' }],
    meals: [
      {
        id: 'meal-d6-desayuno', time: '09:00h', name: 'DESAYUNO', kcal: '~520 kcal',
        items: [
          { name: 'Tostadas pan integral', qty: '2 rebanadas' },
          { name: 'Aguacate', qty: '1/2 ud' },
          { name: 'Huevos revueltos propios', qty: '3 uds' },
          { name: 'Tomates cherry', qty: '80g' },
        ],
      },
      {
        id: 'meal-d6-comida', time: '14:00h', name: 'COMIDA', kcal: '~580 kcal',
        items: [
          { name: 'Lentejas o garbanzos', qty: '90g' },
          { name: 'Verdura de temporada', qty: '150g' },
          { name: 'Pechuga de pollo', qty: '100g' },
        ],
      },
      {
        id: 'meal-d6-merienda', time: '17:30h', name: 'MERIENDA', kcal: '~200 kcal',
        items: [
          { name: 'Kéfir casero', qty: '200ml' },
          { name: 'Fresones o arándanos', qty: '150g' },
          { name: 'Nueces', qty: '15g' },
        ],
      },
      {
        id: 'meal-d6-cena', time: '20:30h', name: 'CENA', kcal: '~420 kcal',
        items: [
          { name: 'Ensalada brotes + cherry', qty: '150g' },
          { name: 'Tofu firme salteado', qty: '150g' },
          { name: 'Champiñones', qty: '100g' },
        ],
      },
    ],
    supplements: [
      { name: 'Malato + D3 + K2 + B12', when: 'Desayuno' },
      { name: 'Bisglicinato de magnesio', when: 'Cena' },
    ],
    notes: [{ cls: 'green', text: '✅ Foam roller piernas 10 min.' }],
  },
]

// Chip labels for day strip
export const DAY_CHIPS = [
  { day: 'LUN', tagCls: 'ct-rest', tagLabel: 'Desc.' },
  { day: 'MAR', tagCls: 'ct-rest', tagLabel: 'Oficina' },
  { day: 'MIÉ', tagCls: 'ct-str',  tagLabel: 'Fuerza' },
  { day: 'JUE', tagCls: 'ct-str',  tagLabel: 'Fuerza' },
  { day: 'VIE', tagCls: 'ct-run',  tagLabel: 'Rodaje' },
  { day: 'SÁB', tagCls: 'ct-long', tagLabel: 'Tirada' },
  { day: 'DOM', tagCls: 'ct-rest', tagLabel: 'Desc.' },
]
