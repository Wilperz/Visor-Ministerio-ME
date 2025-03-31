export const ZONES = [
  { id: 'amazonia', name: 'Región Amazonía' },
  { id: 'andina', name: 'Región Andina' },
  { id: 'caribe', name: 'Región Caribe' },
  { id: 'estructura_1', name: 'Lista recurrente 1' },
  { id: 'estructura_2', name: 'Lista recurrente 2' },
  { id: 'estructura_3', name: 'Lista recurrente 3' },
  { id: 'insular', name: 'Región Insular' },
  { id: 'orinoquia', name: 'Región Orinoquía' },
  { id: 'pacifica', name: 'Región Pacífica' },
  { id: 'pais', name: 'País' }
].sort((a, b) => a.name.localeCompare(b.name));

export const DEPARTMENTS = [
  // Región Caribe
  { id: '20', name: 'CESAR', zone: 'caribe' },
  { id: '47', name: 'MAGDALENA', zone: 'caribe' },
  { id: '13', name: 'BOLÍVAR', zone: 'caribe' },
  { id: '23', name: 'CÓRDOBA', zone: 'caribe' },
  { id: '44', name: 'LA GUAJIRA', zone: 'caribe' },
  { id: '70', name: 'SUCRE', zone: 'caribe' },
  { id: '8', name: 'ATLÁNTICO', zone: 'caribe' },

  // Región Andina
  { id: '63', name: 'QUINDÍO', zone: 'andina' },
  { id: '15', name: 'BOYACÁ', zone: 'andina' },
  { id: '86', name: 'PUTUMAYO', zone: 'andina' },
  { id: '54', name: 'NORTE DE SANTANDER', zone: 'andina' },
  { id: '25', name: 'CUNDINAMARCA', zone: 'andina' },
  { id: '5', name: 'ANTIOQUIA', zone: 'andina' },
  { id: '68', name: 'SANTANDER', zone: 'andina' },
  { id: '11', name: 'BOGOTÁ D.C.', zone: 'andina' },
  { id: '17', name: 'CALDAS', zone: 'andina' },
  { id: '73', name: 'TOLIMA', zone: 'andina' },
  { id: '66', name: 'RISARALDA', zone: 'andina' },

  // Región Amazonía
  { id: '97', name: 'VAUPÉS', zone: 'amazonia' },
  { id: '95', name: 'GUAVIARE', zone: 'amazonia' },
  { id: '91', name: 'AMAZONAS', zone: 'amazonia' },
  { id: '94', name: 'GUAINÍA', zone: 'amazonia' },

  // Región Orinoquía
  { id: '81', name: 'ARAUCA', zone: 'orinoquia' },
  { id: '85', name: 'CASANARE', zone: 'orinoquia' },
  { id: '99', name: 'VICHADA', zone: 'orinoquia' },
  { id: '50', name: 'META', zone: 'orinoquia' },

  // Región Pacífica
  { id: '19', name: 'CAUCA', zone: 'pacifica' },
  { id: '27', name: 'CHOCÓ', zone: 'pacifica' },
  { id: '52', name: 'NARIÑO', zone: 'pacifica' },
  { id: '76', name: 'VALLE DEL CAUCA', zone: 'pacifica' },

  // Región Insular
  { id: '88', name: 'ARCHIPIÉLAGO DE SAN ANDRÉS PROVIDENCIA', zone: 'insular' },

  // Estructura 1
  { id: '25', name: 'CUNDINAMARCA', zone: 'estructura_1' },
  { id: '5', name: 'ANTIOQUIA', zone: 'estructura_1' },
  { id: '68', name: 'SANTANDER', zone: 'estructura_1' },
  { id: '8', name: 'ATLÁNTICO', zone: 'estructura_1' },
  { id: '76', name: 'VALLE DEL CAUCA', zone: 'estructura_1' },

  // Estructura 2
  { id: '20', name: 'CESAR', zone: 'estructura_2' },
  { id: '63', name: 'QUINDÍO', zone: 'estructura_2' },
  { id: '15', name: 'BOYACÁ', zone: 'estructura_2' },
  { id: '54', name: 'NORTE DE SANTANDER', zone: 'estructura_2' },
  { id: '13', name: 'BOLÍVAR', zone: 'estructura_2' },
  { id: '85', name: 'CASANARE', zone: 'estructura_2' },
  { id: '17', name: 'CALDAS', zone: 'estructura_2' },
  { id: '73', name: 'TOLIMA', zone: 'estructura_2' },
  { id: '50', name: 'META', zone: 'estructura_2' },
  { id: '41', name: 'HUILA', zone: 'estructura_2' },

  // Estructura 3
  { id: '81', name: 'ARAUCA', zone: 'estructura_3' },
  { id: '97', name: 'VAUPÉS', zone: 'estructura_3' },
  { id: '19', name: 'CAUCA', zone: 'estructura_3' },
  { id: '27', name: 'CHOCÓ', zone: 'estructura_3' },
  { id: '95', name: 'GUAVIARE', zone: 'estructura_3' },
  { id: '52', name: 'NARIÑO', zone: 'estructura_3' },
  { id: '99', name: 'VICHADA', zone: 'estructura_3' },
  { id: '88', name: 'ARCHIPIÉLAGO DE SAN ANDRÉS PROVIDENCIA', zone: 'estructura_3' },
  { id: '18', name: 'CAQUETÁ', zone: 'estructura_3' },
  { id: '91', name: 'AMAZONAS', zone: 'estructura_3' },
  { id: '94', name: 'GUAINÍA', zone: 'estructura_3' }
].sort((a, b) => a.name.localeCompare(b.name));