import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ExpandedState
} from '@tanstack/react-table';
import { ChevronDown, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { DETERMINANTS, CATEGORIES } from '../../config/determinants';
import * as XLSX from 'xlsx';

interface Municipality {
  dpto_cnmbr: string;
  mpio_cnmbr: string;
  [key: string]: any;
}

interface ResultsTableProps {
  data: Municipality[];
  selectedDeterminants: Set<string>;
}

interface DeterminantDetail {
  name: string;
  value: number;
}

interface CategoryDetail {
  name: string;
  determinants: DeterminantDetail[];
}

function getColorForValue(value: number, minValue: number, maxValue: number): string {
  // If min and max are the same, return a neutral color
  if (minValue === maxValue) {
    return '#FFFFFF';
  }

  // Calculate percentage (0 to 1) where this value falls in the range
  const percentage = (value - minValue) / (maxValue - minValue);

  // Define color stops
  const colors = {
    red: [255, 0, 0],      // High values
    yellow: [255, 255, 0], // Middle values
    green: [0, 255, 0]     // Low values
  };

  let r, g, b;

  if (percentage >= 0.5) {
    // Blend between red and yellow
    const blendFactor = (percentage - 0.5) * 2; // Convert 0.5-1 to 0-1
    r = colors.red[0];
    g = Math.round(colors.yellow[1] * (1 - blendFactor));
    b = colors.red[2];
  } else {
    // Blend between yellow and green
    const blendFactor = percentage * 2; // Convert 0-0.5 to 0-1
    r = Math.round(colors.yellow[0] * blendFactor);
    g = colors.green[1];
    b = colors.green[2];
  }

  // Add some transparency to make it less intense
  return `rgba(${r}, ${g}, ${b}, 0.3)`;
}

function DeterminantsDetail({ 
  row, 
  selectedDeterminants 
}: { 
  row: Municipality; 
  selectedDeterminants: Set<string>;
}) {
  // Group determinants by category
  const categoryDetails: CategoryDetail[] = CATEGORIES
    .filter(category => 
      category.determinants.some(det => selectedDeterminants.has(det.id))
    )
    .map(category => ({
      name: category.name,
      determinants: category.determinants
        .filter(det => selectedDeterminants.has(det.id))
        .map(det => ({
          name: det.name,
          value: row[det.columnName] || 0
        }))
    }));

  return (
    <div className="p-4 bg-gray-50 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {categoryDetails.map((category) => (
          <div key={category.name} className="bg-white rounded-lg shadow p-4">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">{category.name}</h4>
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Determinante</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Suma</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {category.determinants.map((det) => (
                  <tr key={det.name}>
                    <td className="px-4 py-2 text-sm text-gray-900">{det.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">{det.value.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResultsTable({ data, selectedDeterminants }: ResultsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const columnHelper = createColumnHelper<Municipality>();

  // Group selected determinants by category
  const selectedDeterminantsByCategory = DETERMINANTS
    .filter(det => selectedDeterminants.has(det.id))
    .reduce((acc, det) => {
      if (!acc[det.category]) {
        acc[det.category] = [];
      }
      acc[det.category].push(det);
      return acc;
    }, {} as Record<string, typeof DETERMINANTS>);

  // Create category columns
  const categoryColumns = CATEGORIES
    .filter(category => selectedDeterminantsByCategory[category.id]?.length > 0)
    .map(category => 
      columnHelper.accessor(
        row => {
          // Calculate sum of selected determinants for this category
          const determinants = selectedDeterminantsByCategory[category.id];
          if (!determinants) return 0;
          
          return determinants.reduce((sum, det) => {
            const value = row[det.columnName];
            return sum + (typeof value === 'number' ? value : 0);
          }, 0);
        },
        {
          id: category.id,
          header: category.name,
          cell: info => {
            const value = info.getValue();
            return value !== undefined && value !== null ? value.toFixed(1) : '-';
          },
        }
      )
    );

  // Find min and max total values
  const totals = data.map(row => 
    categoryColumns.reduce((total, column) => {
      const value = column.accessorFn?.(row);
      return total + (typeof value === 'number' ? value : 0);
    }, 0)
  );
  const minTotal = Math.min(...totals);
  const maxTotal = Math.max(...totals);

  // Create columns array with department, municipality, categories, and total
  const columns = [
    columnHelper.display({
      id: 'expander',
      header: () => null,
      cell: ({ row }) => (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="px-2"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      ),
    }),
    columnHelper.accessor('dpto_cnmbr', {
      header: 'Departamento',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('mpio_cnmbr', {
      header: 'Municipio',
      cell: info => info.getValue(),
    }),
    ...categoryColumns,
    columnHelper.accessor(
      row => {
        // Calculate total sum across all category columns
        return categoryColumns.reduce((total, column) => {
          const value = column.accessorFn?.(row);
          return total + (typeof value === 'number' ? value : 0);
        }, 0);
      },
      {
        id: 'total',
        header: 'TOTAL',
        cell: info => {
          const value = info.getValue();
          if (value === undefined || value === null) return '-';
          
          const color = getColorForValue(value, minTotal, maxTotal);
          return (
            <div 
              style={{ backgroundColor: color }}
              className="px-2 py-1 rounded"
            >
              {value.toFixed(1)}
            </div>
          );
        },
      }
    )
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      expanded,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: () => true,
  });

  const handleExportToExcel = () => {
    // Create a workbook
    const wb = XLSX.utils.book_new();

    // Process each municipality
    data.forEach((municipality) => {
      // Create main data for the municipality
      const mainData = [{
        Departamento: municipality.dpto_cnmbr,
        Municipio: municipality.mpio_cnmbr,
        ...CATEGORIES.reduce((acc, category) => {
          const determinants = selectedDeterminantsByCategory[category.id];
          if (determinants) {
            const sum = determinants.reduce((total, det) => {
              return total + (municipality[det.columnName] || 0);
            }, 0);
            acc[category.name] = sum.toFixed(1);
          }
          return acc;
        }, {} as Record<string, string>),
        TOTAL: categoryColumns.reduce((total, column) => {
          const value = column.accessorFn?.(municipality);
          return total + (typeof value === 'number' ? value : 0);
        }, 0).toFixed(1)
      }];

      // Create detailed data for determinants
      const detailedData: any[] = [];
      CATEGORIES
        .filter(category => selectedDeterminantsByCategory[category.id]?.length > 0)
        .forEach(category => {
          detailedData.push({ '': '' }); // Empty row for spacing
          detailedData.push({ Categoría: category.name });
          
          category.determinants
            .filter(det => selectedDeterminants.has(det.id))
            .forEach(det => {
              detailedData.push({
                Determinante: det.name,
                Suma: (municipality[det.columnName] || 0).toFixed(1)
              });
            });
        });

      // Combine main and detailed data
      const sheetData = [...mainData, ...detailedData];

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(sheetData, { skipHeader: false });

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, municipality.mpio_cnmbr.slice(0, 31));
    });

    // Save the workbook
    XLSX.writeFile(wb, 'determinantes.xlsx');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-orange-500 px-6 py-2 flex justify-between items-center">
        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold text-white">Determinantes</h2>
        </div>
        <button
          onClick={handleExportToExcel}
          className="flex items-center gap-2 px-3 py-1.5 bg-white text-orange-600 rounded-lg hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <FileSpreadsheet size={18} />
          <span>Exportar a Excel</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <tr className={row.getIsExpanded() ? 'bg-orange-50' : ''}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={row.getVisibleCells().length}>
                      <DeterminantsDetail 
                        row={row.original} 
                        selectedDeterminants={selectedDeterminants}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}