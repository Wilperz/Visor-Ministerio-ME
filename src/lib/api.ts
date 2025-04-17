import { supabase } from './supabase';
import { DETERMINANTS } from '../config/determinants';
import type { FilterOption } from '../types/filters';
import { APP_CONFIG } from '../config/app';

// Utility function to pad municipality codes to 5 digits
function padMunicipalityCode(code: string): string {
  return code.padStart(5, '0');
}

export async function fetchMunicipalityData_Python(departmentId: string, municipalityName: string | null) {
  try {
    const url = new URL(`${APP_CONFIG.pythonApiUrl}/municipality-data/${departmentId}`);
    if (municipalityName && municipalityName !== 'Todos') {
      url.searchParams.append('municipality_name', municipalityName);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from Python API:', error);
    throw error;
  }
}

export async function fetchMunicipalityData_Sb(
  departmentId: string,
  municipalityName: string | null
) {
  try {
    let territorialQuery = supabase
      .from('div_territorial_zonas')
      .select('id_grilla, mpio_cdpmp, dpto_cnmbr, mpio_cnmbr')
      .eq('dpto_ccdgo', departmentId);

    // Only add municipality filter if not "Todos"
    if (municipalityName && municipalityName !== 'Todos') {
      territorialQuery = territorialQuery.eq('mpio_cnmbr', municipalityName);
    }

    const { data: territorialData, error: territorialError } = await territorialQuery
      .order('mpio_cnmbr');

    if (territorialError) {
      console.error('Error fetching territorial data:', territorialError.message);
      throw territorialError;
    }

    if (territorialData && territorialData.length > 0) {
      // Get unique mpio_cdpmp values and ensure they are padded to 5 digits
      const uniqueMpioCdpmp = [...new Set(territorialData.map(item => padMunicipalityCode(item.mpio_cdpmp)))];

      // Fetch determinant data for all municipalities
      const { data: determinantData, error: determinantError } = await supabase
        .from('divterritorialmuni_determinantes')
        .select('*')
        .in('mpio_cdpmp', uniqueMpioCdpmp);

      if (determinantError) {
        console.error('Error fetching determinant data:', determinantError.message);
        throw determinantError;
      }

      const gridIds = territorialData.map(item => item.id_grilla);
      const { data: municipiosData, error: municipiosError } = await supabase
        .from('municipios')
        .select('*')
        .in('id_grilla', gridIds);

      if (municipiosError) {
        console.error('Error fetching municipios data:', municipiosError.message);
        throw municipiosError;
      }

      if (municipiosData && determinantData) {
        const features = municipiosData.map(muni => ({
          type: 'Feature',
          geometry: muni.geom,
          properties: {
            nombre_municipio: muni.nombre_municipio,
            ...Object.fromEntries(
              DETERMINANTS.map(det => [det.columnName, determinantData.find(d => 
                d.mpio_cdpmp === padMunicipalityCode(territorialData.find(t => t.id_grilla === muni.id_grilla)?.mpio_cdpmp || '')
              )?.[det.columnName] || 0])
            )
          }
        }));

        const enrichedData = determinantData.map(det => {
          const territorial = territorialData.find(t => padMunicipalityCode(t.mpio_cdpmp) === det.mpio_cdpmp);
          return {
            ...det,
            mpio_cnmbr: territorial?.mpio_cnmbr || det.mpio_cnmbr,
            dpto_cnmbr: territorial?.dpto_cnmbr || ''
          };
        });

        return { features, enrichedData };
      }
    }
    return null;
  } catch (error) {
    console.error('Error in fetchMunicipalityData_Sb:', error);
    throw error;
  }
}

export async function fetchInitialMunicipios() {
  try {
    if (APP_CONFIG.apiPython) {
      const response = await fetch(`${APP_CONFIG.pythonApiUrl}/initial-municipios`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } else {
      const { data, error } = await supabase
        .from('municipios')
        .select('*')
        .limit(1);

      if (error) {
        throw error;
      }

      return data.map(muni => ({
        type: 'Feature',
        geometry: muni.geom,
        properties: {}
      }));
    }
  } catch (error) {
    console.error('Error fetching initial municipios:', error);
    throw error;
  }
}

export async function fetchMunicipalitiesByDepartment(departmentId: string): Promise<FilterOption[]> {
  try {
    if (APP_CONFIG.apiPython) {
      const response = await fetch(`${APP_CONFIG.pythonApiUrl}/municipalities-by-department/${departmentId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } else {
      const { data, error } = await supabase
        .from('div_territorial_zonas')
        .select('mpio_cdpmp, mpio_cnmbr')
        .eq('dpto_ccdgo', departmentId)
        .order('mpio_cnmbr');

      if (error) {
        throw error;
      }

      // Create a Map to store unique municipalities
      const uniqueMunicipalities = new Map();
      
      // Only keep the first occurrence of each mpio_cdpmp
      data.forEach(muni => {
        if (!uniqueMunicipalities.has(muni.mpio_cdpmp)) {
          uniqueMunicipalities.set(muni.mpio_cdpmp, muni);
        }
      });

      return [
        { id: 'all', name: 'Todos' },
        ...Array.from(uniqueMunicipalities.values())
          .map(muni => ({
            id: muni.mpio_cdpmp,
            name: muni.mpio_cnmbr
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
      ];
    }
  } catch (error) {
    console.error('Error fetching municipalities:', error);
    throw error;
  }
}