import { useState, useEffect } from 'react';
import { FilterContainer } from './filter/FilterContainer';
import { ResultsContainer } from './results/ResultsContainer';
import type { Municipality } from '../types/municipality';
import { fetchInitialMunicipios } from '../lib/api';
import { APP_CONFIG } from '../config/app';

export function MainLayout() {
  const [displayedFeatures, setDisplayedFeatures] = useState<any[]>([]);
  const [comparisonFeatures, setComparisonFeatures] = useState<any[]>([]);
  const [displayedMunicipalities, setDisplayedMunicipalities] = useState<Municipality[]>([]);
  const [selectedDeterminants, setSelectedDeterminants] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadInitialPolygons() {
      if (!APP_CONFIG.initialLoad) {
        return;
      }

      try {
        const features = await fetchInitialMunicipios();
        setDisplayedFeatures(features);
      } catch (error) {
        console.error('Error in loadInitialPolygons:', error);
      }
    }

    loadInitialPolygons();
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

  const handleClear = () => {
    setDisplayedFeatures([]);
    setComparisonFeatures([]);
    setDisplayedMunicipalities([]);
    setSelectedDeterminants(new Set());
  };

  return (
    <div className="h-screen w-screen flex">
      <FilterContainer
        onSearch={handleSearch}
        onComparisonSearch={handleComparisonSearch}
        onClear={handleClear}
      />
      
      <ResultsContainer
        displayedFeatures={displayedFeatures}
        comparisonFeatures={comparisonFeatures}
        displayedMunicipalities={displayedMunicipalities}
        selectedDeterminants={selectedDeterminants}
      />
    </div>
  );
}