import { useState } from 'react';
import { ReportsTable } from './ReportsTable';
import { ReportsResult } from './ReportsResult';
import { supabase } from '../../lib/supabase';

export interface SelectedIndicator {
  key: string;
  name: string;
}

interface ReportsContainerProps {
  municipalityCodes?: string[];
}

// Utility function to pad municipality codes to 5 digits
function padMunicipalityCode(code: string): string {
  return code.padStart(5, '0');
}

export function ReportsContainer({ municipalityCodes = [] }: ReportsContainerProps) {
  const [selectedIndicators, setSelectedIndicators] = useState<SelectedIndicator[]>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQueryClick = async () => {
    if (selectedIndicators.length === 0 || municipalityCodes.length === 0) return;

    setIsLoading(true);
    try {
      // Realiza la consulta a Supabase utilizando los códigos de municipio y los indicadores seleccionados, 
      // consume una función para completar el codigo de municipio con 5 digitos      
      const paddedMunicipalityCodes = municipalityCodes.map(code => padMunicipalityCode(code));

      // Consulta con las key de cada indicador.
      const selectFields = [
        'dpto_cnmbr',
        'mpio_cnmbr',
        ...selectedIndicators.map(indicator => indicator.key)
      ].join(', ');

      const { data, error } = await supabase
        .from('indicadores_territorial')
        .select(selectFields)
        .in('mpio_cdpmp', paddedMunicipalityCodes);

      if (error) {
        throw error;
      }

      setReportData(data || []);
    } catch (error) {
      console.error('Error fetching report data:', error);
      setReportData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <ReportsTable 
        selectedIndicators={selectedIndicators}
        onSelectionChange={setSelectedIndicators}
        onQueryClick={handleQueryClick}
        isLoading={isLoading}
      />
      <ReportsResult 
        selectedIndicators={selectedIndicators}
        reportData={reportData}
        isLoading={isLoading}
      />
    </div>
  );
}