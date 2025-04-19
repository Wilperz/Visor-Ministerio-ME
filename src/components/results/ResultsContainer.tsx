import { MapViewer } from './MapViewer';
import { MapViewerCompare } from './MapViewerCompare';
import { ResultsTable } from './ResultsTable';

import type { Municipality } from '../../types/municipality';

interface ResultsContainerProps {
  displayedFeatures: any[];
  comparisonFeatures: any[];
  displayedMunicipalities: Municipality[];
  selectedDeterminants: Set<string>;
  onMunicipalityQuery: (municipalityData: {
    municipalityId: string;
    municipalityName: string;
    departmentId: string;
    departmentName: string;
  }) => void;
}

export function ResultsContainer({
  displayedFeatures,
  comparisonFeatures,
  displayedMunicipalities,
  selectedDeterminants,
  onMunicipalityQuery
}: ResultsContainerProps) {
  // Only show print button when there are features AND they're not the initial load features
  const showPrintButton = displayedFeatures.length > 0 && 
    displayedFeatures.some(feature => !feature.properties?.textStyle);

  // Only show comparison print button when there are comparison features
  const showComparisonPrintButton = comparisonFeatures.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        {/* Main Map */}
        <div className="w-1/2 border-r border-gray-200">
          <div className="h-8 bg-orange-500 flex items-center justify-center border-b border-orange-600">
            <h2 className="text-lg font-semibold text-white">Mapa Principal</h2>
          </div>
          <div className="p-2 h-[calc(100%-2rem)]">
            <MapViewer
              features={displayedFeatures}
              className="h-full rounded-lg shadow-lg overflow-hidden"
              onMunicipalityQuery={onMunicipalityQuery}
              showPrintButton={showPrintButton}
            />
          </div>
        </div>
        
        {/* Comparison Map */}
        <div className="w-1/2">
          <div className="h-8 bg-orange-500 flex items-center justify-center border-b border-orange-600">
            <h2 className="text-lg font-semibold text-white">Mapa de Comparación</h2>
          </div>
          <div className="p-2 h-[calc(100%-2rem)]">
            <MapViewerCompare
              features={comparisonFeatures}
              className="h-full rounded-lg shadow-lg overflow-hidden"
              showPrintButton={showComparisonPrintButton}
            />
          </div>
        </div>
      </div>

      {/* Results Table */}
      {displayedMunicipalities.length > 0 && (
        <div className="h-1/3 p-4 bg-gray-50 overflow-y-auto border-t border-gray-200">
          <ResultsTable
            data={displayedMunicipalities}
            selectedDeterminants={selectedDeterminants}
          />
        </div>
      )}
    </div>
  );
}