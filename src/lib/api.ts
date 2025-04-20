import { supabase } from './supabase';
import { DETERMINANTS } from '../config/determinants';
import type { FilterOption } from '../types/filters';
import { APP_CONFIG } from '../config/app';

// Utility function to pad municipality codes to 5 digits
function padMunicipalityCode(code: string): string {
  return code.padStart(5, '0');
}

export async function fetchMunicipalityData_Python(departmentId: string, municipalityId: string | null) {
  try {
    const url = new URL(`${APP_CONFIG.pythonApiUrl}/municipality-data/${departmentId}`);
    if (municipalityId && municipalityId !== '-1') {
      url.searchParams.append('municipality_id', municipalityId);
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
  municipalityId: string | null
) {
  try {
    // Initialize arrays to store all data
    let allTerritorialData: any[] = [];
    let hasMore = true;
    let page = 0;
    const pageSize = 1000;

    // Fetch territorial data with pagination
    while (hasMore) {
      let territorialQuery = supabase
        .from('div_territorial_zonas')
        .select('id_grilla, mpio_cdpmp, dpto_cnmbr, mpio_cnmbr')
        .eq('dpto_ccdgo', departmentId)
        .order('mpio_cnmbr')
        .range(page * pageSize, (page + 1) * pageSize - 1);

      // Only add municipality filter if not "Todos"
      if (municipalityId && municipalityId !== '-1') {
        territorialQuery = territorialQuery.eq('mpio_cdpmp', municipalityId);
      }

      const { data: territorialData, error: territorialError } = await territorialQuery;

      if (territorialError) {
        console.error('Error fetching territorial data:', territorialError.message);
        throw territorialError;
      }

      if (territorialData && territorialData.length > 0) {
        allTerritorialData = [...allTerritorialData, ...territorialData];
        if (territorialData.length < pageSize) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }

      page++;
    }

    if (allTerritorialData.length > 0) {
      // Get unique mpio_cdpmp values and ensure they are padded to 5 digits
      const uniqueMpioCdpmp = [...new Set(allTerritorialData.map(item => padMunicipalityCode(item.mpio_cdpmp)))];

      // Fetch determinant data for all municipalities
      const { data: determinantData, error: determinantError } = await supabase
        .from('divterritorialmuni_determinantes')
        .select('*')
        .in('mpio_cdpmp', uniqueMpioCdpmp);

      if (determinantError) {
        console.error('Error fetching determinant data:', determinantError.message);
        throw determinantError;
      }

      const gridIds = allTerritorialData.map(item => item.id_grilla);
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
            text: muni.mpio_cnmbr,
            idMunicipio: muni.mpio_cdpmp,
            Municipio: muni.mpio_cnmbr,
            idDepartamento: departmentId,
            Departamento: allTerritorialData.find(t => t.id_grilla === muni.id_grilla)?.dpto_cnmbr,
            ...Object.fromEntries(
              DETERMINANTS.map(det => [det.columnName, determinantData.find(d => 
                d.mpio_cdpmp === padMunicipalityCode(allTerritorialData.find(t => t.id_grilla === muni.id_grilla)?.mpio_cdpmp || '')
              )?.[det.columnName] || 0])
            )
          }
        }));

        const enrichedData = determinantData.map(det => {
          const territorial = allTerritorialData.find(t => padMunicipalityCode(t.mpio_cdpmp) === det.mpio_cdpmp);
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
        .from('div_territorial_municipios')
        .select('geom, mpio_cdpmp, mpio_cnmbr, dpto_ccdgo, dpto_cnmbr')
        .limit(1300);

      if (error) {
        throw error;
      }
      console.log("data municipio", data);
      return data.map(muni => ({        
        type: 'Feature',
        geometry: muni.geom,
        properties: {          
          text: muni.mpio_cnmbr,
          idMunicipio: muni.mpio_cdpmp,
          Municipio: muni.mpio_cnmbr,
          idDepartamento: muni.dpto_ccdgo,
          Departamento: muni.dpto_cnmbr,
          textStyle: {
            font: '12px Arial',
            fill: '#000',
            stroke: '#fff',
            strokeWidth: 3,
            offsetY: -15
          }
        }
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
      console.log("**fetchMunicipalitiesByDepartment:", departmentId);
      
      // Initialize arrays to store all data
      let allData: any[] = [];
      let hasMore = true;
      let page = 0;
      const pageSize = 1000;

      // Fetch all pages
      while (hasMore) {
        const { data, error } = await supabase
          .from('div_territorial_zonas')
          .select('mpio_cdpmp, mpio_cnmbr')
          .eq('dpto_ccdgo', departmentId)
          .order('mpio_cnmbr')
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          allData = [...allData, ...data];
          if (data.length < pageSize) {
            hasMore = false;
          }
        } else {
          hasMore = false;
        }

        page++;
      }

      console.log("Cantidad total de municipios retornados:", allData.length);

      // Create a Map to store unique municipalities
      const uniqueMunicipalities = new Map();
      
      // Only keep the first occurrence of each mpio_cdpmp
      allData.forEach(muni => {
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