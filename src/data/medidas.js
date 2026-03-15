// Weight records
export const PESO_REGISTROS = [
  { fecha: '2026-02-19', peso: 78.70 },
  { fecha: '2026-02-22', peso: 78.90 },
  { fecha: '2026-02-26', peso: 79.40 },
  { fecha: '2026-02-27', peso: 79.55 },
  { fecha: '2026-02-28', peso: 79.20 },
  { fecha: '2026-03-01', peso: 80.20 },
  { fecha: '2026-03-03', peso: 79.50 },
  { fecha: '2026-03-04', peso: 79.90 },
  { fecha: '2026-03-05', peso: 80.10 },
  { fecha: '2026-03-06', peso: 80.25 },
  { fecha: '2026-03-07', peso: 80.60 },
  { fecha: '2026-03-08', peso: 80.10 },
  { fecha: '2026-03-09', peso: 80.10 },
  { fecha: '2026-03-10', peso: 80.20 },
  { fecha: '2026-03-11', peso: 79.40 },
  { fecha: '2026-03-13', peso: 79.65 },
]

const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']

function fmtFecha(iso) {
  const d = new Date(iso)
  return `${d.getDate()} ${MESES[d.getMonth()]}`
}

// Body measurements with history and target
export const MEDIDAS_DATA = {
  peso: {
    label: 'Peso corporal', unidad: 'kg', objetivo: 70,
    objetivoLabel: 'Objetivo maratón: <strong>70 kg</strong> · faltan −9.4 kg · diciembre 2026',
    registros: PESO_REGISTROS.map(r => ({ fecha: fmtFecha(r.fecha), valor: r.peso })),
    alza: true,
  },
  cintura: {
    label: 'Cintura', unidad: 'cm', objetivo: 82,
    objetivoLabel: 'Objetivo: <strong>~82 cm</strong> · faltan −7 cm · próxima medición 1 abr',
    registros: [{ fecha: '2 mar', valor: 89 }],
    alza: true,
  },
  abdomen: {
    label: 'Abdomen', unidad: 'cm', objetivo: null,
    objetivoLabel: 'Objetivo: reducir con déficit calórico · próxima medición 1 abr',
    registros: [{ fecha: '2 mar', valor: 96 }],
    alza: true,
  },
  cadera: {
    label: 'Cadera', unidad: 'cm', objetivo: null,
    objetivoLabel: 'Referencia anatómica · próxima medición 1 abr',
    registros: [{ fecha: '2 mar', valor: 94 }],
    alza: false,
  },
  pecho: {
    label: 'Pecho', unidad: 'cm', objetivo: null,
    objetivoLabel: 'Referencia muscular',
    registros: [{ fecha: '2 mar', valor: 99 }],
    alza: false,
  },
  hombros: {
    label: 'Hombros', unidad: 'cm', objetivo: null,
    objetivoLabel: 'Referencia muscular',
    registros: [{ fecha: '2 mar', valor: 117 }],
    alza: false,
  },
  brazo: {
    label: 'Brazo', unidad: 'cm', objetivo: null,
    objetivoLabel: 'Referencia muscular',
    registros: [{ fecha: '2 mar', valor: 35.5 }],
    alza: false,
  },
  muslo: {
    label: 'Muslo', unidad: 'cm', objetivo: null,
    objetivoLabel: 'Referencia muscular',
    registros: [{ fecha: '2 mar', valor: 67.5 }],
    alza: false,
  },
  gemelo: {
    label: 'Gemelo', unidad: 'cm', objetivo: null,
    objetivoLabel: 'Referencia muscular',
    registros: [{ fecha: '2 mar', valor: 39 }],
    alza: false,
  },
  ratio: {
    label: 'Ratio cintura/cadera', unidad: '', objetivo: 0.90,
    objetivoLabel: 'Objetivo: <strong>&lt;0.90</strong> (riesgo cardiovascular bajo) · actual 0.95',
    registros: [{ fecha: '2 mar', valor: 0.95 }],
    alza: true,
  },
  grasa: {
    label: 'Grasa corporal (Navy)', unidad: '%', objetivo: 15,
    objetivoLabel: 'Objetivo: <strong>~15%</strong> para maratón · actual ~22-24%',
    registros: [{ fecha: '2 mar', valor: 23 }],
    alza: true,
  },
}

// Garmin data (would come from API in a real app)
export const GARMIN = {
  date: '13 mar 2026 · 06:29h',
  trainingStatus: { val: 'Recovery', sub: '✓ Desde 13 mar', color: '#10A46A' },
  vo2max: { val: '45', sub: 'Good ✓', color: '#10A46A' },
  hrv: { val: '31 ms', sub: '■ Unbalanced · 7d avg', color: '#b8860b' },
  bodyBattery: { val: '60', sub: '+37 cargado · −0 drenado', color: '#10A46A' },
  trainingLoad: { val: 'Low', sub: '13/176 · Ratio 0.0', sub2: 'High Aerobic Shortage', color: '#111' },
  sleep: { val: '79', sub: '8h 18m · 21:51–06:22', color: '#10A46A' },
  fitnessAge: { val: '39', sub: 'Edad real 40 · target 34.5', color: '#10A46A' },
  fcReposo: { val: '59 bpm', color: '#10A46A' },
}
