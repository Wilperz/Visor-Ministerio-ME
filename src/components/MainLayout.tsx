import { useState, useEffect } from 'react';
import { FilterContainer } from './filter/FilterContainer';
import { ResultsContainer } from './results/ResultsContainer';
import type { Municipality } from '../types/municipality';
import { fetchInitialMunicipios } from '../lib/api';
import { APP_CONFIG } from '../config/app';
import type { FilterOption } from '../types/filters';

export function MainLayout() {
  const [displayedFeatures, setDisplayedFeatures] = useState<any[]>([]);
  const [comparisonFeatures, setComparisonFeatures] = useState<any[]>([]);
  const [displayedMunicipalities, setDisplayedMunicipalities] = useState<Municipality[]>([]);
  const [selectedDeterminants, setSelectedDeterminants] = useState<Set<string>>(new Set());
  const [selectedZone, setSelectedZone] = useState<FilterOption | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<FilterOption | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<FilterOption | null>(null);

  const loadInitialPolygons = async () => {
    try {
      const features = await fetchInitialMunicipios();
      setDisplayedFeatures(features);
    } catch (error) {
      console.error('Error in loadInitialPolygons:', error);
    }
  };

  useEffect(() => {
    if (APP_CONFIG.initialLoad) {
      loadInitialPolygons();
    }
  }, []);

  const handleSearch = (features: any[], municipalities: Municipality[], determinants: Set<string>) => {
    setDisplayedFeatures(features);
    setDisplayedMunicipalities(municipalities);
    setSelectedDeterminants(determinants);
  };

  const handleComparisonSearch = (features: any[], municipalities: Municipality[]) => {
    setComparisonFeatures(features);
    setDisplayedMunicipalities(municipalities);
  };

  const handleClear = async () => {
    // Clear comparison map
    setComparisonFeatures([]);
    
    // Clear municipalities data and determinants
    setDisplayedMunicipalities([]);
    setSelectedDeterminants(new Set());
    
    // Reset filter selections
    setSelectedZone(null);
    setSelectedDepartment(null);
    setSelectedMunicipality(null);

    // Reload initial municipalities for the main map
    await loadInitialPolygons();
  };

  const handleMunicipalityQuery = (municipalityData: {
    municipalityId: string;
    municipalityName: string;
    departmentId: string;
    departmentName: string;
  }) => {
    // Set País as the selected zone
    const paisZone: FilterOption = { id: 'pais', name: 'País' };
    setSelectedZone(paisZone);

    // Set the department
    const department: FilterOption = {
      id: municipalityData.departmentId,
      name: municipalityData.departmentName
    };
    setSelectedDepartment(department);

    // Set the municipality
    const municipality: FilterOption = {
      id: municipalityData.municipalityId,
      name: municipalityData.municipalityName
    };
    setSelectedMunicipality(municipality);
  };

  return (
    <div className="h-screen w-screen flex">
      <FilterContainer
        onSearch={handleSearch}
        onComparisonSearch={handleComparisonSearch}
        onClear={handleClear}
        selectedZone={selectedZone}
        selectedDepartment={selectedDepartment}
        selectedMunicipality={selectedMunicipality}
        onZoneChange={setSelectedZone}
        onDepartmentChange={setSelectedDepartment}
        onMunicipalityChange={setSelectedMunicipality}
      />
      
      <ResultsContainer
        displayedFeatures={displayedFeatures}
        comparisonFeatures={comparisonFeatures}
        displayedMunicipalities={displayedMunicipalities}
        selectedDeterminants={selectedDeterminants}
        onMunicipalityQuery={handleMunicipalityQuery}
      />
    </div>
  );
}