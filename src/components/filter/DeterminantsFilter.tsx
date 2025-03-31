import { Fragment, useState, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES } from '../../config/determinants';
import type { Determinant } from '../../config/determinants';

interface DeterminantsFilterProps {
  onSelectionChange?: (selectedDeterminants: Set<string>) => void;
}

interface CategoryAccordionProps {
  title: string;
  determinants: Determinant[];
  selectedDeterminants: Set<string>;
  onDeterminantChange: (determinantIds: string[]) => void;
}

function CategoryAccordion({
  title,
  determinants,
  selectedDeterminants,
  onDeterminantChange
}: CategoryAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const allSelected = determinants.every(d => selectedDeterminants.has(d.id));
  
  const handleSelectAll = useCallback(() => {
    const currentIds = determinants.map(d => d.id);
    const otherSelectedIds = Array.from(selectedDeterminants).filter(id => !currentIds.includes(id));
    
    if (allSelected) {
      onDeterminantChange(otherSelectedIds);
    } else {
      onDeterminantChange([...otherSelectedIds, ...currentIds]);
    }
  }, [determinants, selectedDeterminants, onDeterminantChange]);
  
  const handleToggleDeterminant = useCallback((determinantId: string) => {
    const newSelected = new Set(selectedDeterminants);
    if (newSelected.has(determinantId)) {
      newSelected.delete(determinantId);
    } else {
      newSelected.add(determinantId);
    }
    onDeterminantChange(Array.from(newSelected));
  }, [selectedDeterminants, onDeterminantChange]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        className="w-full px-4 py-2 flex items-center justify-between bg-orange-50 hover:bg-orange-100 border-b border-orange-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isOpen && (
        <div className="p-4 space-y-4 bg-white">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Seleccionar todo</span>
          </label>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium text-gray-700">Nombre del Determinante</div>
            <div className="font-medium text-gray-700">Selección</div>
            
            {determinants.map((determinant) => (
              <Fragment key={determinant.id}>
                <div className="text-sm text-gray-600">{determinant.name}</div>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedDeterminants.has(determinant.id)}
                    onChange={() => handleToggleDeterminant(determinant.id)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function DeterminantsFilter({ onSelectionChange }: DeterminantsFilterProps) {
  const [localSelectedDeterminants, setLocalSelectedDeterminants] = useState<Set<string>>(new Set());

  const handleDeterminantsChange = useCallback((determinants: string[]) => {
    const newSet = new Set(determinants);
    setLocalSelectedDeterminants(newSet);
    if (onSelectionChange) {
      onSelectionChange(newSet);
    }
  }, [onSelectionChange]);

  // Add a method to clear all selections
  const clearAllSelections = useCallback(() => {
    setLocalSelectedDeterminants(new Set());
    if (onSelectionChange) {
      onSelectionChange(new Set());
    }
  }, [onSelectionChange]);

  // Expose the clear method to parent components
  if (typeof window !== 'undefined') {
    (window as any).clearDeterminants = clearAllSelections;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Determinante - Categoría</h3>
      <div className="space-y-2">
        {CATEGORIES.map(category => (
          <CategoryAccordion
            key={category.id}
            title={category.name}
            determinants={category.determinants}
            selectedDeterminants={localSelectedDeterminants}
            onDeterminantChange={handleDeterminantsChange}
          />
        ))}
      </div>
    </div>
  );
}