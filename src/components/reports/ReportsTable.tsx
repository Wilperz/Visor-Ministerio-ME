import { INDICATORS } from '../../config/reports';
import type { SelectedIndicator } from './ReportsContainer';

interface ReportsTableProps {
  selectedIndicators: SelectedIndicator[];
  onSelectionChange: (indicators: SelectedIndicator[]) => void;
  onQueryClick: () => void;
  isLoading?: boolean;
}

export function ReportsTable({ 
  selectedIndicators, 
  onSelectionChange,
  onQueryClick,
  isLoading = false
}: ReportsTableProps) {
  const handleCheckboxChange = (indicator: { key: string; name: string }) => {
    const isSelected = selectedIndicators.some(i => i.key === indicator.key);
    
    if (isSelected) {
      onSelectionChange(selectedIndicators.filter(i => i.key !== indicator.key));
    } else {
      onSelectionChange([...selectedIndicators, indicator]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-orange-500 px-4 py-2">
        <h3 className="text-lg font-semibold text-white">INDICADORES SOCIOECONÓMICOS</h3>
      </div>
      <div className="overflow-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variable
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sel
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {INDICATORS.map((indicator) => (
              <tr key={indicator.key} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {indicator.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedIndicators.some(i => i.key === indicator.key)}
                    onChange={() => handleCheckboxChange(indicator)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onQueryClick}
          disabled={selectedIndicators.length === 0 || isLoading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${
            selectedIndicators.length === 0 || isLoading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700'
          } text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
        >
          {isLoading ? 'Consultando...' : 'Consultar'}
        </button>
      </div>
    </div>
  );
}