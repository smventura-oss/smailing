import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSemanaStore = defineStore('semana', () => {
  // ── Días de la semana ──
  const DIA_TIPO   = ['fuerza', 'rodaje', 'oficina', 'fuerza', 'rodaje', 'tirada', 'descanso']
  const DIA_NOMBRE = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  const DIA_EMOJI  = ['💪', '🏃', '🏢', '💪', '🏃', '🏔️', '😴']
  const DIA_TAGS   = ['Fuerza', 'Rodaje', 'Oficina', 'Fuerza', 'Rodaje', 'Tirada', 'Desc.']
  const DIA_TAG_CSS = ['ct-str', 'ct-run', 'ct-rest', 'ct-str', 'ct-run', 'ct-long', 'ct-rest']

  // Índice del día de hoy (Lun=0 … Dom=6)
  function diaIdx() {
    const js = new Date().getDay() // 0=Dom
    return js === 0 ? 6 : js - 1
  }

  // Fechas de la semana actual
  function weekDates() {
    const today = new Date()
    const jsDay = today.getDay()
    const diffToMon = jsDay === 0 ? -6 : 1 - jsDay
    const monday = new Date(today)
    monday.setDate(today.getDate() + diffToMon)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return d
    })
  }

  // ── Datos de comidas por día ──
  const dias = [
    // 0 — Lunes — Descanso
    {
      tipo: 'descanso', badge: 'b-rest', badgeLabel: '😴 Descanso — resfriado',
      kcal: '1.750', deficit: 'déficit −300',
      proteina: '110g', carbos: '220g', grasa: '58g',
      comidas: [
        { id: 'd0-desayuno', hora: '08:00h', nombre: 'DESAYUNO', kcal: '~500 kcal',
          ings: [['Copos de avena','60g'],['Leche de soja','250ml'],['Plátano','1 ud'],['Nueces peladas','20g'],['Café','1 taza']],
          nota: '💊 Último día de Farmagrip — descansa.' },
        { id: 'd0-comida', hora: '13:00h', nombre: 'COMIDA', kcal: '~620 kcal',
          ings: [['Lentejas pardinas','90g'],['Zanahoria','100g'],['Pimientos y cebolla','100g'],['Aceite de oliva','10ml']],
          nota: '🫘 Legumbre antiinflamatoria — recuperación.' },
        { id: 'd0-merienda', hora: '17:00h', nombre: 'MERIENDA', kcal: '~280 kcal',
          ings: [['Kéfir casero','200ml'],['Pera','1 ud'],['Anacardos naturales','20g']] },
        { id: 'd0-cena', hora: '20:30h', nombre: 'CENA', kcal: '~560 kcal',
          ings: [['Merluza al horno','160g'],['Patata cocida','120g'],['Brócoli al vapor','150g'],['Aceite de oliva','10ml']] },
      ],
      suplementos: [['Malato + D3 + K2 + B12','Desayuno'],['Bisglicinato de magnesio','Cena']],
    },
    // 1 — Martes — Oficina
    {
      tipo: 'oficina', badge: 'b-rest', badgeLabel: '🏢 Oficina — sin entreno',
      kcal: '1.700', deficit: 'déficit −350',
      proteina: '115g', carbos: '210g', grasa: '55g',
      comidas: [
        { id: 'd1-desayuno', hora: '08:00h · oficina', nombre: 'DESAYUNO', kcal: '~480 kcal',
          ings: [['Copos de avena · oficina','60g'],['Leche de soja · oficina','250ml'],['Plátano · oficina','1 ud'],['Anacardos salados · oficina','20g'],['Café · oficina','1 taza']] },
        { id: 'd1-comida', hora: '13:30h · oficina', nombre: 'COMIDA', kcal: '~600 kcal',
          ings: [['Honest Greens o ApetEat','1 plato']],
          nota: '🥗 Alternar HG y ApetEat.' },
        { id: 'd1-merienda', hora: '17:00h · oficina', nombre: 'MERIENDA', kcal: '~220 kcal',
          ings: [['Yogur La Fageda · oficina','1 ud'],['Mandarina · oficina','1 ud'],['Nueces · oficina','20g']] },
        { id: 'd1-cena', hora: '20:30h', nombre: 'CENA', kcal: '~560 kcal',
          ings: [['Salmón a la plancha','180g'],['Patata cocida','130g'],['Ensalada brotes tiernos','100g']] },
      ],
      suplementos: [['Malato + D3 + K2 + B12','Desayuno (en oficina)'],['Bisglicinato de magnesio','Cena']],
    },
    // 2 — Miércoles — Fuerza A
    {
      tipo: 'fuerza', badge: 'b-str', badgeLabel: '💪 Fuerza garaje A · 35 min · 20h',
      badgeExtra: { label: '✅ Completada · 23min · FC103 · BB−1 · RPE 2/10', style: 'background:#e8f5e9;color:#2e7d32;' },
      kcal: '1.850', deficit: 'déficit −350',
      proteina: '130g', carbos: '235g', grasa: '60g',
      comidas: [
        { id: 'd2-desayuno', hora: '08:00h', nombre: 'DESAYUNO', kcal: '~500 kcal',
          ings: [['Muesli de frutas','60g'],['Leche de soja','250ml'],['Plátano','1 ud'],['Nueces peladas','20g']] },
        { id: 'd2-comida', hora: '13:00h', nombre: 'COMIDA', kcal: '~640 kcal',
          ings: [['Pollo al horno','200g'],['Quinoa cocida','70g'],['Calabacín salteado','150g']] },
        { id: 'd2-merienda', hora: '17:00h', nombre: 'MERIENDA', kcal: '~280 kcal',
          ings: [['Yogur griego ligero','150g'],['Pera','1 ud']] },
        { id: 'd2-cena', hora: '21:00h · post fuerza', nombre: 'CENA', kcal: '~580 kcal',
          ings: [['Dorada al horno','180g'],['Patata cocida','130g'],['Brócoli al vapor','150g']] },
      ],
      suplementos: [['Malato + D3 + K2 + B12','Desayuno'],['Colágeno 15g + zumo naranja','90 min pre-entreno'],['Bisglicinato de magnesio','Cena']],
      nota: { tipo: 'blue', texto: '💪 Garaje 20h — Joy duerme ~19:30h.' },
    },
    // 3 — Jueves — Fuerza B
    {
      tipo: 'fuerza', badge: 'b-str', badgeLabel: '💪 Fuerza garaje B · 35 min · 20h',
      kcal: '1.850', deficit: 'déficit −350',
      proteina: '130g', carbos: '235g', grasa: '60g',
      comidas: [
        { id: 'd3-desayuno', hora: '08:00h', nombre: 'DESAYUNO', kcal: '~500 kcal',
          ings: [['Muesli de frutas','60g'],['Leche de soja','250ml'],['Plátano','1 ud'],['Nueces peladas','20g']] },
        { id: 'd3-comida', hora: '13:00h', nombre: 'COMIDA', kcal: '~640 kcal',
          ings: [['Tofu firme salteado','200g'],['Arroz integral','70g'],['Mix de setas','150g']] },
        { id: 'd3-merienda', hora: '17:00h', nombre: 'MERIENDA', kcal: '~280 kcal',
          ings: [['Kéfir casero','150ml'],['Mandarina','1 ud'],['Anacardos naturales','20g']] },
        { id: 'd3-cena', hora: '21:00h · post fuerza', nombre: 'CENA', kcal: '~580 kcal',
          ings: [['Salmón al horno','180g'],['Batata al horno','150g'],['Champiñones salteados','120g']] },
      ],
      suplementos: [['Malato + D3 + K2 + B12','Desayuno'],['Colágeno 15g + zumo naranja','90 min pre-entreno'],['Bisglicinato de magnesio','Cena']],
      nota: { tipo: 'blue', texto: '💪 Garaje 20h — tren superior + core.' },
    },
    // 4 — Viernes — Rodaje
    {
      tipo: 'rodaje', badge: 'b-run', badgeLabel: '🏃 Rodaje Z1-Z2 · 6 km · 19h',
      kcal: '1.950', deficit: 'déficit −300',
      proteina: '130g', carbos: '250g', grasa: '62g',
      comidas: [
        { id: 'd4-desayuno', hora: '08:00h', nombre: 'DESAYUNO', kcal: '~500 kcal',
          ings: [['Muesli de frutas','60g'],['Leche de soja','250ml'],['Plátano','1 ud'],['Nueces peladas','20g']] },
        { id: 'd4-comida', hora: '13:00h', nombre: 'COMIDA', kcal: '~640 kcal',
          ings: [['Pechuga de pollo','200g'],['Pasta integral','80g'],['Ensalada brotes tiernos','80g']],
          nota: '💡 Come antes de las 14h — margen antes del rodaje.' },
        { id: 'd4-merienda', hora: '17:30h', nombre: 'MERIENDA', kcal: '~300 kcal',
          ings: [['Kéfir casero','150ml'],['Mandarina','1 ud'],['Anacardos naturales','20g']],
          nota: '⚡ Colágeno 90 min pre-rodaje.' },
        { id: 'd4-cena', hora: '20:30h · post rodaje', nombre: 'CENA', kcal: '~560 kcal',
          ings: [['Huevos revueltos propios','3 uds'],['Tostadas pan integral','2 rebanadas'],['Tomates cherry','80g']] },
      ],
      suplementos: [['Malato + D3 + K2 + B12','Desayuno'],['Colágeno 15g + zumo naranja','90 min pre-rodaje'],['Bisglicinato de magnesio','Cena']],
      nota: { tipo: 'blue', texto: '💧 FC <150. Primer rodaje post-resfriado — sin forzar.' },
    },
    // 5 — Sábado — Tirada
    {
      tipo: 'tirada', badge: 'b-long', badgeLabel: '🏔️ Tirada trail Z2 · 10-12 km · 15h',
      kcal: '2.300', deficit: 'déficit −250',
      proteina: '140g', carbos: '340g', grasa: '70g',
      comidas: [
        { id: 'd5-desayuno', hora: '09:00h', nombre: 'DESAYUNO', kcal: '~620 kcal',
          ings: [['Muesli de frutas','65g'],['Leche de soja','250ml'],['Plátano','1 ud'],['Nueces peladas','25g']],
          nota: '⚡ Desayuno grande 3h antes de salir.' },
        { id: 'd5-comida', hora: '12:00h', nombre: 'COMIDA PRE-TIRADA', kcal: '~480 kcal',
          ings: [['Tortillas integrales','2 uds'],['Hummus','80g'],['Aguacate','1/2 ud'],['Huevo duro propio','1 ud']] },
        { id: 'd5-merienda', hora: '17:30h · post tirada', nombre: 'MERIENDA', kcal: '~370 kcal',
          ings: [['Kéfir casero','150ml'],['Plátano','1 ud'],['Anacardos naturales','30g']],
          nota: '⚡ Come en 30-45 min post-tirada.' },
        { id: 'd5-cena', hora: '20:30h', nombre: 'CENA', kcal: '~700 kcal',
          ings: [['Salmón al horno','200g'],['Batata al horno','200g'],['Brócoli al vapor','150g']] },
      ],
      suplementos: [['Malato + D3 + K2 + B12','Desayuno'],['Colágeno 15g + zumo naranja','90 min pre-tirada'],['Bisglicinato de magnesio','Cena']],
      nota: { tipo: 'blue', texto: '💧 2.5L + sales en ruta.' },
    },
    // 6 — Domingo — Descanso
    {
      tipo: 'descanso', badge: 'b-rest', badgeLabel: '😴 Descanso — familia',
      kcal: '1.650', deficit: 'déficit −400',
      proteina: '120g', carbos: '205g', grasa: '52g',
      comidas: [
        { id: 'd6-desayuno', hora: '09:00h', nombre: 'DESAYUNO', kcal: '~520 kcal',
          ings: [['Tostadas pan integral','2 rebanadas'],['Aguacate','1/2 ud'],['Huevos revueltos propios','3 uds'],['Tomates cherry','80g']] },
        { id: 'd6-comida', hora: '14:00h', nombre: 'COMIDA', kcal: '~580 kcal',
          ings: [['Lentejas o garbanzos','90g'],['Verdura de temporada','150g'],['Pechuga de pollo','100g']] },
        { id: 'd6-merienda', hora: '17:30h', nombre: 'MERIENDA', kcal: '~200 kcal',
          ings: [['Kéfir casero','200ml'],['Fresones o arándanos','150g'],['Nueces','15g']] },
        { id: 'd6-cena', hora: '20:30h', nombre: 'CENA', kcal: '~420 kcal',
          ings: [['Ensalada brotes + cherry','150g'],['Tofu firme salteado','150g'],['Champiñones','100g']] },
      ],
      suplementos: [['Malato + D3 + K2 + B12','Desayuno'],['Bisglicinato de magnesio','Cena']],
      nota: { tipo: 'green', texto: '✅ Foam roller piernas 10 min.' },
    },
  ]

  // ── Peso registros ──
  const pesoRegistros = [
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
  ]

  // ── Despensa ──
  const CATS = [
    { id: 'proteina', label: '🐟 Proteína' },
    { id: 'verdura',  label: '🥦 Verdura'  },
    { id: 'fruta',    label: '🍌 Fruta'    },
    { id: 'lacteos',  label: '🥛 Lácteos'  },
    { id: 'base',     label: '🥣 Base & Despensa' },
    { id: 'secos',    label: '🥜 Frutos secos' },
    { id: 'suplem',   label: '💊 Suplementos' },
  ]

  const ITEMS = [
    { id:'salmon',    name:'Salmón',                   note:'Cena post-entreno',        cat:'proteina' },
    { id:'lubina',    name:'Lubina',                   note:'',                         cat:'proteina' },
    { id:'dorada',    name:'Dorada',                   note:'',                         cat:'proteina' },
    { id:'tofu',      name:'Tofu firme x2',            note:'Proteína vegetal',         cat:'proteina' },
    { id:'lentejas',  name:'Lentejas pardinas',        note:'Pre-rodaje',               cat:'proteina' },
    { id:'miniburg',  name:'Mini burgers vegetales',   note:'Espinacas y zanahoria',    cat:'proteina' },
    { id:'huevos',    name:'Huevos de gallina',        note:'Propios — 3 gallinas',     cat:'proteina' },
    { id:'pollo',     name:'Pechuga de pollo',         note:'Recetario',                cat:'proteina' },
    { id:'sojatext',  name:'Soja texturizada',         note:'Recetario',                cat:'proteina' },
    { id:'tempeh',    name:'Tempeh natural',           note:'Recetario',                cat:'proteina' },
    { id:'merluza',   name:'Merluza',                  note:'Recetario: al horno',      cat:'proteina' },
    { id:'calabacin', name:'Calabacín',                note:'',                         cat:'verdura'  },
    { id:'brocoli',   name:'Brócoli',                  note:'',                         cat:'verdura'  },
    { id:'champi',    name:'Champiñón laminado',       note:'',                         cat:'verdura'  },
    { id:'setas',     name:'Mix de setas',             note:'',                         cat:'verdura'  },
    { id:'pimientos', name:'Pimientos y cebolla',      note:'Salteado Mercadona',       cat:'verdura'  },
    { id:'brotes',    name:'Ensalada brotes tiernos',  note:'',                         cat:'verdura'  },
    { id:'cherry',    name:'Tomates cherry',           note:'',                         cat:'verdura'  },
    { id:'zanahoria', name:'Zanahoria',                note:'',                         cat:'verdura'  },
    { id:'batata',    name:'Bastones de batata',       note:'Ultracongelada',           cat:'verdura'  },
    { id:'patata',    name:'Patatas',                  note:'Recetario',                cat:'verdura'  },
    { id:'platanos',  name:'Plátanos de Canarias',     note:'Desayuno + pre-entreno',   cat:'fruta'    },
    { id:'peras',     name:'Peras Conferencia',        note:'Merienda',                 cat:'fruta'    },
    { id:'mandarinas',name:'Mandarinas',               note:'Snack',                    cat:'fruta'    },
    { id:'aguacate',  name:'Aguacate',                 note:'Desayuno y ensaladas',     cat:'fruta'    },
    { id:'arandanos', name:'Arándanos',                note:'Merienda',                 cat:'fruta'    },
    { id:'freson',    name:'Fresones',                 note:'Merienda',                 cat:'fruta'    },
    { id:'datiles',   name:'Dátiles',                  note:'Barritas caseras',         cat:'fruta'    },
    { id:'yogur',     name:'Yogur griego ligero',      note:'Desayuno / merienda',      cat:'lacteos'  },
    { id:'mozzarella',name:'Mozzarella fresca x4',     note:'',                         cat:'lacteos'  },
    { id:'feta',      name:'Queso feta en dados',      note:'',                         cat:'lacteos'  },
    { id:'lechesoja', name:'Bebida de soja',           note:'Desayuno',                 cat:'lacteos'  },
    { id:'lecheent',  name:'Leche entera fresca',      note:'Para el kéfir casero',     cat:'lacteos'  },
    { id:'kefir',     name:'Kéfir casero',             note:'Merienda — hecho en casa', cat:'lacteos'  },
    { id:'avena',     name:'Copos de avena',           note:'Base desayunos',           cat:'base'     },
    { id:'pancamp',   name:'Pan campeón x2',           note:'Pan integral Mercadona',   cat:'base'     },
    { id:'hummus',    name:'Hummus x2',                note:'Snack / merienda',         cat:'base'     },
    { id:'tortillas', name:'Tortillas integrales x2',  note:'',                         cat:'base'     },
    { id:'cafe',      name:'Café molido x2',           note:'',                         cat:'base'     },
    { id:'quinoa',    name:'Quinoa',                   note:'Recetario',                cat:'base'     },
    { id:'arrozint',  name:'Arroz integral',           note:'Recetario',                cat:'base'     },
    { id:'pastaint',  name:'Pasta integral',           note:'Recetario',                cat:'base'     },
    { id:'tahini',    name:'Tahini',                   note:'Recetario: salsas',        cat:'base'     },
    { id:'nueces',    name:'Nueces peladas',           note:'Desayuno / merienda',      cat:'secos'    },
    { id:'anacardos', name:'Anacardos naturales',      note:'Oficina',                  cat:'secos'    },
    { id:'pistachos', name:'Pistachos naturales',      note:'',                         cat:'secos'    },
    { id:'vitd',      name:'Vitamina D3 4.000 UI + K2',note:'Essentiális Heel',         cat:'suplem'   },
    { id:'colageno',  name:'Colágeno hidrolizado',     note:'Polvo · pre-entreno',      cat:'suplem'   },
  ]

  const NEEDS_BUYING = ['pollo','sojatext','tempeh','merluza','patata','platanos','peras','tortillas','quinoa','arrozint','pastaint','tahini','freson','arandanos','datiles']

  const despensaState = ref({})

  function initDespensa() {
    ITEMS.forEach(item => {
      if (!despensaState.value[item.id]) {
        despensaState.value[item.id] = {
          inDesp: !NEEDS_BUYING.includes(item.id),
          bought: false,
        }
      }
    })
  }

  function moverACompra(id) {
    if (despensaState.value[id]) {
      despensaState.value[id].inDesp = false
      despensaState.value[id].bought = false
    }
  }

  function toggleBought(id) {
    if (!despensaState.value[id]) return
    despensaState.value[id].bought = !despensaState.value[id].bought
    if (despensaState.value[id].bought) {
      setTimeout(() => {
        if (despensaState.value[id]) {
          despensaState.value[id].inDesp = true
          despensaState.value[id].bought = false
        }
      }, 700)
    }
  }

  function marcarTodoComprado() {
    ITEMS.forEach(item => {
      if (despensaState.value[item.id]) {
        despensaState.value[item.id].inDesp = true
        despensaState.value[item.id].bought = false
      }
    })
  }

  initDespensa()

  return {
    dias,
    DIA_TIPO, DIA_NOMBRE, DIA_EMOJI, DIA_TAGS, DIA_TAG_CSS,
    diaIdx,
    weekDates,
    pesoRegistros,
    CATS, ITEMS,
    despensaState,
    moverACompra,
    toggleBought,
    marcarTodoComprado,
  }
})
