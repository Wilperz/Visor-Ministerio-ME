import { useState, useCallback } from 'react';
import { MunicipalityFilter } from './MunicipalityFilter';
import { DeterminantsFilter } from './DeterminantsFilter';
import { ComparisonFilter } from './ComparisonFilter';
import { ActionButtons } from './ActionButtons';
import type { FilterOption } from '../../types/filters';
import type { Municipality } from '../../types/municipality';
import { fetchMunicipalityData_Sb, fetchMunicipalityData_Python } from '../../lib/api';
import { APP_CONFIG } from '../../config/app';

interface FilterContainerProps {
  onSearch: (features: any[], municipalities: Municipality[], selectedDeterminants: Set<string>) => void;
  onComparisonSearch: (features: any[], municipalities: Municipality[]) => void;
  onClear: () => void;
}

export function FilterContainer({
  onSearch,
  onComparisonSearch,
  onClear
}: FilterContainerProps) {
  const [selectedZone, setSelectedZone] = useState<FilterOption | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<FilterOption | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<FilterOption | null>(null);
  const [comparisonDepartment, setComparisonDepartment] = useState<FilterOption | null>(null);
  const [comparisonMunicipality, setComparisonMunicipality] = useState<FilterOption | null>(null);
  const [wantComparison, setWantComparison] = useState(false);
  const [currentDeterminants, setCurrentDeterminants] = useState<Set<string>>(new Set());
  const [indicadoresTerritorial, setIndicadoresTerritorial] = useState<any>({});

  const handleDeterminantsChange = useCallback((determinants: Set<string>) => {
    setCurrentDeterminants(determinants);
  }, []);

  // Function to pad department code to 2 digits
  const padDepartmentCode = (code: string): string => {
    return code.padStart(2, '0');
  };

  // Function to pad municipality code to 5 digits
  const padMunicipalityCode = (code: string): string => {
    return code.padStart(5, '0');
  };

  const handleSearch = async () => {
    if (!selectedDepartment || !selectedMunicipality) return;
    let enrichedDataArray: any[] = [];
    let fetatureData: any[] = [];
    let featureComparison: any[] = [];

    // Generate DatosMuniDpto array with padded codes for Fredy App
    const DatosMuniDpto = [
      padDepartmentCode(selectedDepartment.id),
      selectedMunicipality.id === 'all' ? '-1' : padMunicipalityCode(selectedMunicipality.id),
      wantComparison && comparisonDepartment ? padDepartmentCode(comparisonDepartment.id) : '0',
      wantComparison && comparisonMunicipality ? 
        comparisonMunicipality.id === 'all' ? '-1' : padMunicipalityCode(comparisonMunicipality.id) 
        : '0'
    ].join(',');
    console.log("DatosMuniDpto:",DatosMuniDpto)

    if (typeof window !== 'undefined' && (window as any).GenerarReporte) {
      (window as any).GenerarReporte(DatosMuniDpto);
    }

    try {
      // Fetch territorial indicators
      //TODO send for Fredy App
      if (APP_CONFIG.apiPython) {
        const response = await fetch(`${APP_CONFIG.pythonApiUrl}/indicadores-territorial`);
        const dataIndicadores = await response.json();
        setIndicadoresTerritorial(dataIndicadores.indicadores);
      }

      // Handle main municipality data
      let data;
      if (APP_CONFIG.apiPython) {
        data = await fetchMunicipalityData_Python(
          selectedDepartment.id,
          selectedMunicipality.name
        );
      } else {
        data = await fetchMunicipalityData_Sb(
          selectedDepartment.id,
          selectedMunicipality.name
        );
      }

      if (data) {
        data.enrichedData.forEach((value) => enrichedDataArray.push(value));
        fetatureData = data.features;
      }

      // Handle comparison data if enabled
      if (wantComparison && comparisonDepartment && comparisonMunicipality) {
        let comparisonData;
        if (APP_CONFIG.apiPython) {
          comparisonData = await fetchMunicipalityData_Python(
            comparisonDepartment.id,
            comparisonMunicipality.name
          );
        } else {
          comparisonData = await fetchMunicipalityData_Sb(
            comparisonDepartment.id,
            comparisonMunicipality.name
          );
        }

        if (comparisonData) {
          comparisonData.enrichedData.forEach((value) => enrichedDataArray.push(value));
          featureComparison = comparisonData.features;
        }
      }

      onSearch(fetatureData, enrichedDataArray, currentDeterminants);
      if (featureComparison.length > 0) {
        onComparisonSearch(featureComparison, enrichedDataArray);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleClear = () => {
    setSelectedZone(null);
    setSelectedDepartment(null);
    setSelectedMunicipality(null);
    setComparisonDepartment(null);
    setComparisonMunicipality(null);
    setWantComparison(false);
    setCurrentDeterminants(new Set());
    setIndicadoresTerritorial({});
    
    // Clear determinants using the exposed window method
    if (typeof window !== 'undefined' && (window as any).clearDeterminants) {
      (window as any).clearDeterminants();
    }
    
    onClear();
  };

  return (
    <div className="w-80 bg-gray-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 m-4 space-y-6">
        <MunicipalityFilter
          selectedZone={selectedZone}
          selectedDepartment={selectedDepartment}
          selectedMunicipality={selectedMunicipality}
          onZoneChange={setSelectedZone}
          onDepartmentChange={setSelectedDepartment}
          onMunicipalityChange={setSelectedMunicipality}
        />

        <DeterminantsFilter onSelectionChange={handleDeterminantsChange} />

        <ComparisonFilter
          enabled={wantComparison}
          selectedDepartment={comparisonDepartment}
          selectedMunicipality={comparisonMunicipality}
          onEnableChange={setWantComparison}
          onDepartmentChange={setComparisonDepartment}
          onMunicipalityChange={setComparisonMunicipality}
        />

        <ActionButtons
          onSearch={handleSearch}
          onClear={handleClear}
          disabled={!selectedMunicipality || (wantComparison && !comparisonMunicipality)}
        />
      </div>
    </div>
  );
}