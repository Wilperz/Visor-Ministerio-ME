import type { SelectedIndicator } from './ReportsContainer';

interface ReportData {
  dpto_cnmbr: string;
  mpio_cnmbr: string;
  [key: string]: any;
}

interface ReportsResultProps {
  selectedIndicators: SelectedIndicator[];
  reportData: ReportData[];
  isLoading: boolean;
}

export function ReportsResult({ 
  selectedIndicators, 
  reportData,
  isLoading 
}: ReportsResultProps) {
  if (selectedIndicators.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 text-center">
          Seleccione indicadores para ver los resultados
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 text-center">
          Cargando resultados...
        </p>
      </div>
    );
  }

  if (reportData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 text-center">
          No hay datos disponibles para los indicadores seleccionados
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-orange-500 px-4 py-2">
        <h3 className="text-lg font-semibold text-white">Resultados</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Municipio
              </th>
              {selectedIndicators.map(indicator => (
                <th 
                  key={indicator.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {indicator.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reportData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.dpto_cnmbr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.mpio_cnmbr}
                </td>
                {selectedIndicators.map(indicator => (
                  <td 
                    key={indicator.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {row[indicator.key]?.toFixed(2) ?? 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}