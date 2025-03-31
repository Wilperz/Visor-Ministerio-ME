import { useState, useRef, useEffect } from 'react';
import type { Map } from 'ol';
import { FilterContainer } from './filter/FilterContainer';
import { ResultsContainer } from './results/ResultsContainer';
import type { Municipality } from '../types/municipality';
import { supabase } from '../lib/supabase';
import { APP_CONFIG } from '../config/app';

export function MainLayout() {
  const [displayedFeatures, setDisplayedFeatures] = useState<any[]>([]);
  const [comparisonFeatures, setComparisonFeatures] = useState<any[]>([]);
  const [displayedMunicipalities, setDisplayedMunicipalities] = useState<Municipality[]>([]);
  const [selectedDeterminants, setSelectedDeterminants] = useState<Set<string>>(new Set());

  const mainMapRef = useRef<Map | null>(null);
  const secondaryMapRef = useRef<Map | null>(null);

  useEffect(() => {
    async function loadInitialPolygons() {
      // Only load initial polygons if initialLoad is true
      if (!APP_CONFIG.initialLoad) {
        return;
      }

      try {
        const { data: municipiosData, error } = await supabase
          .from('municipios')
          .select('*')
          .limit(1); // Start with a small query to test connection

        if (error) {
          console.error('Error loading initial polygons:', error.message);
          if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          }
          return;
        }

        if (municipiosData) {
          const features = municipiosData.map(muni => ({
            type: 'Feature',
            geometry: muni.geom,
            properties: {}
          }));

          setDisplayedFeatures(features);
        }
      } catch (error) {
        console.error('Error in loadInitialPolygons:', error);
        if (error instanceof Error) {
          console.error('Error details:', error.message);
        }
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
    setDisplayedMunicipalities(prev => [...prev, ...municipalities]);
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
        onMainMapInit={(map) => mainMapRef.current = map}
        onSecondaryMapInit={(map) => secondaryMapRef.current = map}
      />
    </div>
  );
}