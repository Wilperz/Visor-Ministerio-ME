import { MapViewer } from './MapViewer';
import { MapViewerCompare } from './MapViewerCompare';
import { ResultsTable } from './ResultsTable';
import type { Map } from 'ol';
import type { Municipality } from '../../types/municipality';

interface ResultsContainerProps {
  displayedFeatures: any[];
  comparisonFeatures: any[];
  displayedMunicipalities: Municipality[];
  selectedDeterminants: Set<string>;
  onMainMapInit: (map: Map) => void;
  onSecondaryMapInit: (map: Map) => void;
}

export function ResultsContainer({
  displayedFeatures,
  comparisonFeatures,
  displayedMunicipalities,
  selectedDeterminants,
  onMainMapInit,
  onSecondaryMapInit
}: ResultsContainerProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        {/* Main Map */}
        <div className="w-1/2 border-r border-gray-200">
          <div className="h-8 bg-orange-500 flex items-center justify-center border-b border-orange-600">
            <h2 className="text-lg font-semibold text-white">Mapa Principal</h2>
          </div>
          <div className="p-2 h-[calc(100%-2rem)]">
            <MapViewerCompare
              features={displayedFeatures}
              className="h-full rounded-lg shadow-lg overflow-hidden"
            />
          </div>
        </div>
        
        {/* Comparison Map */}
        <div className="w-1/2">
          <div className="h-8 bg-orange-500 flex items-center justify-center border-b border-orange-600">
            <h2 className="text-lg font-semibold text-white">Mapa de Comparación</h2>
          </div>
          <div className="p-2 h-[calc(100%-2rem)]">
            <MapViewer
              features={comparisonFeatures}
              className="h-full rounded-lg shadow-lg overflow-hidden"
              onMapInit={onMainMapInit}
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