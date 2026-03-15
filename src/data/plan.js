// Training plan data

export const RACES = [
  {
    id: 'montjuic',
    title: 'Salomon Run Montjuïc',
    date: 'Abril 2026 · ~6 sem.',
    badges: [{ cls: 'amber', text: 'Trail 9.4K' }, { cls: 'green', text: '✅ Inscrito' }],
    stats: [
      { val: '9.4K', color: 'var(--md-warning)', lbl: 'Distancia' },
      { val: '+238m', color: 'var(--md-warning)', lbl: 'Desnivel' },
      { val: '1h30', color: 'var(--md-error)', lbl: 'Límite' },
      { val: '~1h15', color: 'var(--md-success)', lbl: 'Objetivo' },
    ],
    statsClass: 'rc-stats-4',
    strategy: '<strong>Estrategia:</strong> Ritmo 8:00 min/km objetivo · caminar rampas >12% · sales desde km 3.',
    prob: { id: 'ps1', pct: 92, pctOld: 88, lbl: 'Probabilidad de acabar en tiempo', sub: 'Límite 1h30 · actualizado mar 2026', color: 'var(--md-success)', bgColor: 'var(--md-success-container)' },
  },
  {
    id: 'diagonal',
    title: 'Cursa de la Diagonal',
    date: '24 Mayo 2026 · ~11 sem.',
    badges: [{ cls: 'blue', text: 'Asfalto 10K' }, { cls: 'green', text: '✅ Inscrito' }],
    stats: [
      { val: '10K', color: 'var(--md-secondary)', lbl: 'Distancia' },
      { val: '−71m', color: 'var(--md-secondary)', lbl: 'Desnivel' },
      { val: '<55:00', color: 'var(--md-secondary)', lbl: 'Objetivo' },
    ],
    strategy: '<strong>Estrategia:</strong> Velocity Nitro 4 · conservador km 0-3 (subida) · dar todo bajada final.',
    prob: { id: 'ps2', pct: 82, pctOld: 71, lbl: 'Probabilidad de sub 55:00', sub: 'Antes: 71% → Ahora: 82%', color: 'var(--md-warning)', bgColor: 'var(--md-warning-container)' },
  },
  {
    id: 'bonesvalls',
    title: 'Marca Bonesvalls Trail',
    date: '18 Oct 2026 · ~31 sem.',
    badges: [{ cls: 'amber', text: 'Trail 26K' }, { cls: 'green', text: '✅ Fecha confirmada' }],
    stats: [
      { val: '26K', color: 'var(--md-warning)', lbl: 'Distancia' },
      { val: 'Alto', color: 'var(--md-warning)', lbl: 'Desnivel' },
      { val: 'Completar', color: 'var(--md-success)', lbl: 'Objetivo' },
    ],
    strategy: '<strong>Estrategia:</strong> Caminar todas las subidas · gel y sales cada 45 min · no estrenar nada.',
    prob: { id: 'ps3', pct: 91, pctOld: 84, lbl: 'Probabilidad de completarla', sub: 'Antes: 84% → Ahora: 91%', color: 'var(--md-success)', bgColor: 'var(--md-success-container)' },
  },
  {
    id: 'mitja',
    title: 'Mitja Marató Barcelona',
    date: '~15 Feb 2027 · ~49 sem.',
    badges: [{ cls: 'purple', text: '21K asfalto' }, { cls: 'amber', text: '⚠️ Abre verano' }],
    stats: [
      { val: '22.2K', color: 'var(--md-primary)', lbl: 'Distancia' },
      { val: '+37m', color: 'var(--md-primary)', lbl: 'Desnivel' },
      { val: '<2:15h', color: 'var(--md-primary)', lbl: 'Objetivo' },
    ],
    strategy: '<strong>Estrategia:</strong> 6:03/km · test definitivo de forma · sub-2:10 asegura maratón sub-5h.',
    prob: { id: 'ps4', pct: 83, pctOld: 74, lbl: 'Probabilidad de sub 2:15h', sub: 'Antes: 74% → Ahora: 83%', color: 'var(--md-primary)', bgColor: 'var(--md-primary-container)' },
  },
  {
    id: 'maraton',
    title: 'Maratón Barcelona 🎯',
    date: '2 Mar 2027 · ~53 sem.',
    badges: [{ cls: 'red', text: '42K asfalto' }, { cls: 'amber', text: '⚠️ Abre junio' }],
    stats: [
      { val: '43.1K', color: 'var(--md-error)', lbl: 'Distancia' },
      { val: '+222m', color: 'var(--md-error)', lbl: 'Desnivel' },
      { val: '<5:00h', color: 'var(--md-error)', lbl: 'Objetivo' },
    ],
    strategy: '<strong>Km 0-14:</strong> 7:20/km. <strong>Km 14-30:</strong> 7:00-7:10/km. <strong>Km 30-42:</strong> gestionar el muro. Gel cada 40-45 min desde km 10.',
    prob: { id: 'ps5', pct: 87, pctOld: 82, lbl: 'Probabilidad de sub 5:00h', sub: 'Antes: 82% → Ahora: 87%', color: 'var(--md-error)', bgColor: 'var(--md-error-container)' },
  },
]

export const PHASES = [
  {
    id: 'f1', num: 'Fase 01', name: 'Base Aeróbica',
    dates: 'Marzo → Junio 2026 · 16 sem. · ACTUAL',
    cls: 'p1', open: true,
    stats: [
      { val: '20-35', color: 'var(--md-success)', lbl: 'km/sem' },
      { val: '3', color: 'var(--md-success)', lbl: 'sesiones' },
      { val: '<155', color: 'var(--md-success)', lbl: 'FC máx' },
      { val: '80%', color: 'var(--md-success)', lbl: 'Zona 2' },
    ],
    tables: [
      {
        title: 'Sem 1–3 · Base pura (AHORA)',
        rows: [
          { day: 'LUN', session: '😴 Descanso', km: '—', rest: true },
          { day: 'MAR', session: '🏢 Oficina', km: '—', rest: true },
          { day: 'MIÉ 20h', session: '💪 Fuerza garaje A · Tren inferior', km: '35 min' },
          { day: 'JUE 20h', session: '💪 Fuerza garaje B · Tren superior', km: '35 min' },
          { day: 'VIE 19h', session: '🏃 Rodaje suave Z2 · FC <155', km: '6-8' },
          { day: 'SÁB 15h', session: '🏔️ Tirada trail Z2 · Electrify Nitro 4', km: '10-14' },
          { day: 'DOM', session: '😴 Familia', km: '—', rest: true },
        ],
      },
      {
        title: 'Sem 4–8 · Strides + desnivel',
        titleBadge: true,
        rows: [
          { day: 'MIÉ 20h', session: '💪 Fuerza A', km: '—' },
          { day: 'JUE 20h', session: '💪 Fuerza B', km: '—' },
          { day: 'VIE 19h', session: '🏃 Rodaje Z2 + 6×20 seg strides al final', km: '7-9', highlight: true },
          { day: 'SÁB 15h', session: '🏔️ Tirada trail desnivel progresivo 80-150m D+', km: '12-16', highlight: true },
        ],
      },
    ],
  },
  {
    id: 'f2', num: 'Fase 02', name: 'Desarrollo',
    dates: 'Julio → Sep 2026 · 13 sem.',
    cls: 'p2', open: false,
    stats: [
      { val: '35-48', color: 'var(--md-secondary)', lbl: 'km/sem' },
      { val: '4', color: 'var(--md-secondary)', lbl: 'sesiones' },
      { val: '<165', color: 'var(--md-secondary)', lbl: 'FC máx' },
      { val: '300m+', color: 'var(--md-secondary)', lbl: 'D+ mín' },
    ],
    tables: [],
  },
  {
    id: 'f3', num: 'Fase 03', name: 'Específica Maratón',
    dates: 'Nov → Dic 2026 · 13 sem.',
    cls: 'p3', open: false,
    stats: [
      { val: '50-60', color: 'var(--md-warning)', lbl: 'km/sem' },
      { val: '4-5', color: 'var(--md-warning)', lbl: 'sesiones' },
      { val: '28-32', color: 'var(--md-warning)', lbl: 'km tirada' },
      { val: '7:00', color: 'var(--md-warning)', lbl: 'min/km' },
    ],
    tables: [],
  },
  {
    id: 'f4', num: 'Fase 04', name: 'Pico & Tapering',
    dates: 'Ene → 2 Mar 2027 · 8 sem.',
    cls: 'p4', open: false,
    stats: [
      { val: '55-65', color: 'var(--md-primary)', lbl: 'km pico' },
      { val: '3', color: 'var(--md-primary)', lbl: 'sem. taper' },
      { val: '32km', color: 'var(--md-primary)', lbl: 'simulacro' },
      { val: '2 MAR', color: 'var(--md-error)', lbl: 'Día D' },
    ],
    tables: [],
  },
]

// Current week schedule rows (for "Esta semana" tab)
export const CURRENT_WEEK = {
  alert: 'FASE 1 · Semana 3 de 16 · 9–15 mar 2026 · <span style="font-weight:400;">Base pura — recuperación resfriado</span>',
  warning: '⚠️ <strong>Garmin Strained</strong> · BB 27 · HRV 30ms Low (11 mar). Semana muy ligera. Si jueves BB &lt;35 → sustituir Fuerza B por movilidad.',
  stats: [
    { val: '16', color: 'var(--md-success)', lbl: 'km planif.' },
    { val: '2', color: '#5c6bc0', lbl: 'fuerza' },
    { val: '⚠️', color: '#ef6c00', lbl: 'Strained' },
  ],
  rows: [
    { day: 'LUN 9',  session: '😴 Descanso — resfriado', km: '—', rest: true },
    { day: 'MAR 10', session: '🏢 Oficina — sin entreno', km: '—', rest: true },
    { day: 'MIÉ 11', session: '💪 Fuerza A · Tren inferior · 20h', km: '—', badge: { style: 'background:#e8f5e9;color:#2e7d32;', text: '✅ 23min' }, done: true },
    { day: 'JUE 12', session: '💪 Fuerza B · Tren superior + core · 20h', km: '35 min' },
    { day: 'VIE 13', session: '🏃 Rodaje Z1-Z2 · FC <150 · Primer post-resfriado', km: '6', today: true },
    { day: 'SÁB 14', session: '🏔️ Tirada trail Z2 · FC <155 · Sin forzar', km: '10–12' },
    { day: 'DOM 15', session: '😴 Descanso — familia', km: '—', rest: true },
  ],
  fuerzaA: {
    title: 'Fuerza A · Miércoles ✅ — Tren inferior + glúteos',
    exercises: [
      { icon: '🦵', name: 'Sentadilla goblet', detail: '3×10 · MC 16kg' },
      { icon: '🏋️', name: 'Hip thrust', detail: '3×12 · 22kg' },
      { icon: '🦵', name: 'Zancadas inversas', detail: '3×10 c/lado · 2×10kg' },
      { icon: '🐸', name: 'Puente glúteo unilateral', detail: '3×12 c/lado' },
      { icon: '📦', name: 'Step-up plyo box', detail: '3×8 c/lado · 2×12kg' },
      { icon: '🧘', name: 'Plancha isométrica', detail: '3×30s' },
    ],
  },
  fuerzaB: {
    title: 'Fuerza B · Jueves — Tren superior + core',
    exercises: [
      { icon: '💪', name: 'Press banca inclinado', detail: '3×10 · 2×18kg' },
      { icon: '🏋️', name: 'Remo con mancuerna', detail: '3×12 c/lado · 20kg' },
      { icon: '💪', name: 'Press militar de pie', detail: '3×10 · 2×14kg' },
      { icon: '🏃', name: 'Curl femoral TecTake', detail: '3×12' },
      { icon: '🧘', name: 'Dead bug', detail: '3×10 c/lado' },
      { icon: '🔄', name: 'Rotación rusa', detail: '3×15 · 8kg' },
    ],
  },
}
