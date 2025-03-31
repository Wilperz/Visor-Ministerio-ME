export interface Determinant {
  id: string;
  name: string;
  category: 'social' | 'ambiental' | 'sectorial' | 'infraestructura';
  columnName: string;
}

export const DETERMINANTS: Determinant[] = [
  // 1-Social
  {
    id: 'S_111',
    name: 'Resguardo Indígena',
    category: 'social',
    columnName: 'suma_s_111'
  },
  {
    id: 'S_112',
    name: 'Solicitud Coloniales - RIOC',
    category: 'social',
    columnName: 'suma_s_112'
  },
  {
    id: 'S_113',
    name: 'Solicitud Ancestrales - Dec 2333 de 2014',
    category: 'social',
    columnName: 'suma_s_113'
  },
  {
    id: 'S_114',
    name: 'Solicitud legalización',
    category: 'social',
    columnName: 'suma_s_114'
  },
  {
    id: 'S_115',
    name: 'Linea Negra',
    category: 'social',
    columnName: 'suma_s_115'
  },
  {
    id: 'S_121',
    name: 'CC de Comunidades Negras',
    category: 'social',
    columnName: 'suma_s_121'
  },
  {
    id: 'S_122',
    name: 'Área pretendida en titulacion Colectiva',
    category: 'social',
    columnName: 'suma_s_122'
  },
  {
    id: 'S_123',
    name: 'Aspiraciones',
    category: 'social',
    columnName: 'suma_s_123'
  },
  {
    id: 'S_131',
    name: 'Constituidas',
    category: 'social',
    columnName: 'suma_s_131'
  },
  {
    id: 'S_132',
    name: 'Proceso',
    category: 'social',
    columnName: 'suma_s_132'
  },
  {
    id: 'S_141',
    name: 'Áreas arqueologicas Protegidas',
    category: 'social',
    columnName: 'suma_s_141'
  },
  {
    id: 'S_151',
    name: 'Zonas de Frontera',
    category: 'social',
    columnName: 'suma_s_151'
  },
  {
    id: 'S_161',
    name: 'Individual',
    category: 'social',
    columnName: 'suma_s_161'
  },
  {
    id: 'S_162',
    name: 'Colectiva',
    category: 'social',
    columnName: 'suma_s_162'
  },
  {
    id: 'S_163',
    name: 'Microzonas',
    category: 'social',
    columnName: 'suma_s_163'
  },
  {
    id: 'S_164',
    name: 'Decreto 2007',
    category: 'social',
    columnName: 'suma_s_164'
  },

  // 2-Ambiental
  {
    id: 'A_211',
    name: 'RUNAP',
    category: 'ambiental',
    columnName: 'suma_a_211'
  },
  {
    id: 'A_221',
    name: 'Páramos',
    category: 'ambiental',
    columnName: 'suma_a_221'
  },
  {
    id: 'A_222',
    name: 'Bosque Seco tropical',
    category: 'ambiental',
    columnName: 'suma_a_222'
  },
  {
    id: 'A_223',
    name: 'Manglar',
    category: 'ambiental',
    columnName: 'suma_a_223'
  },
  {
    id: 'A_231',
    name: 'Ley 2/59',
    category: 'ambiental',
    columnName: 'suma_a_231'
  },
  {
    id: 'A_241',
    name: 'AICAS',
    category: 'ambiental',
    columnName: 'suma_a_241'
  },
  {
    id: 'A_242',
    name: 'ZPRNRMA resolución 125 de 2021',
    category: 'ambiental',
    columnName: 'suma_a_242'
  },
  {
    id: 'A_243',
    name: 'Bosques de Paz',
    category: 'ambiental',
    columnName: 'suma_a_243'
  },
  {
    id: 'A_244',
    name: 'POMCAS',
    category: 'ambiental',
    columnName: 'suma_a_244'
  },
  {
    id: 'A_245',
    name: 'Bancos de Habitat ICDE resolución 1051 de 2017',
    category: 'ambiental',
    columnName: 'suma_a_245'
  },
  {
    id: 'A_251',
    name: 'SIPTA EN EVALUACION',
    category: 'ambiental',
    columnName: 'suma_a_251'
  },
  {
    id: 'A_252',
    name: 'Licencias APROBADAS',
    category: 'ambiental',
    columnName: 'suma_a_252'
  },

  // 3-Sectorial
  {
    id: 'T_311',
    name: 'Titulo Vigentes',
    category: 'sectorial',
    columnName: 'suma_t_311'
  },
  {
    id: 'T_312',
    name: 'Solicitudes Vigentes',
    category: 'sectorial',
    columnName: 'suma_t_312'
  },
  {
    id: 'T_313',
    name: 'Zona Minera Etnica',
    category: 'sectorial',
    columnName: 'suma_t_313'
  },
  {
    id: 'T_321',
    name: 'Mapa de Tierras',
    category: 'sectorial',
    columnName: 'suma_t_321'
  },
  {
    id: 'T_322',
    name: 'Gasodutos y Poliductos',
    category: 'sectorial',
    columnName: 'suma_t_322'
  },
  {
    id: 'T_331',
    name: 'Subestaciones',
    category: 'sectorial',
    columnName: 'suma_t_331'
  },
  {
    id: 'T_332',
    name: 'Lineas contruidas STN',
    category: 'sectorial',
    columnName: 'suma_t_332'
  },
  {
    id: 'T_333',
    name: 'Generación Actual',
    category: 'sectorial',
    columnName: 'suma_t_333'
  },
  {
    id: 'T_334',
    name: 'Generacion Prospectiva',
    category: 'sectorial',
    columnName: 'suma_t_334'
  },
  {
    id: 'T_335',
    name: 'ZNI',
    category: 'sectorial',
    columnName: 'suma_t_335'
  },

  // 4-Infraestructura
  {
    id: 'N_411',
    name: 'Vias Principal',
    category: 'infraestructura',
    columnName: 'suma_n_411'
  },
  {
    id: 'N_412',
    name: 'Vias todas',
    category: 'infraestructura',
    columnName: 'suma_n_412'
  },
  {
    id: 'N_421',
    name: 'Casco Urbano',
    category: 'infraestructura',
    columnName: 'suma_n_421'
  },
  {
    id: 'N_431',
    name: 'Puertos',
    category: 'infraestructura',
    columnName: 'suma_n_431'
  },
  {
    id: 'N_441',
    name: 'Navegables',
    category: 'infraestructura',
    columnName: 'suma_n_441'
  }
];

export const CATEGORIES = [
  {
    id: 'social',
    name: '1-Social',
    determinants: DETERMINANTS.filter(d => d.category === 'social')
  },
  {
    id: 'ambiental',
    name: '2-Ambiental',
    determinants: DETERMINANTS.filter(d => d.category === 'ambiental')
  },
  {
    id: 'sectorial',
    name: '3-Sectorial',
    determinants: DETERMINANTS.filter(d => d.category === 'sectorial')
  },
  {
    id: 'infraestructura',
    name: '4-Infraestructura',
    determinants: DETERMINANTS.filter(d => d.category === 'infraestructura')
  }
];