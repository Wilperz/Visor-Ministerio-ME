import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import type { FilterOption } from '../../types/filters';
import { DEPARTMENTS } from '../../config/constants';
import { supabase } from '../../lib/supabase';

interface ComparisonFilterProps {
  enabled: boolean;
  selectedDepartment: FilterOption | null;
  selectedMunicipality: FilterOption | null;
  onEnableChange: (enabled: boolean) => void;
  onDepartmentChange: (department: FilterOption | null) => void;
  onMunicipalityChange: (municipality: FilterOption | null) => void;
}

interface Municipality {
  mpio_cnmbr: string;
  mpio_cdpmp: string;
}

export function ComparisonFilter({
  enabled,
  selectedDepartment,
  selectedMunicipality,
  onEnableChange,
  onDepartmentChange,
  onMunicipalityChange
}: ComparisonFilterProps) {
  const [municipalities, setMunicipalities] = useState<FilterOption[]>([]);

  // Remove duplicate departments by creating a Map with department ID as key
  const uniqueDepartments = Array.from(
    new Map(
      DEPARTMENTS.map(dept => [dept.id, dept])
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    async function fetchMunicipalities() {
      if (selectedDepartment) {
        const { data, error } = await supabase
          .from('div_territorial_zonas')
          .select('mpio_cdpmp, mpio_cnmbr')
          .eq('dpto_ccdgo', selectedDepartment.id)
          .order('mpio_cnmbr');

        if (error) {
          console.error('Error fetching comparison municipalities:', error);
          return;
        }

        if (data) {
          // Create a Map to store unique municipalities
          const uniqueMunicipalities = new Map<string, Municipality>();
          
          // Only keep the first occurrence of each mpio_cdpmp
          data.forEach((muni: Municipality) => {
            if (!uniqueMunicipalities.has(muni.mpio_cdpmp)) {
              uniqueMunicipalities.set(muni.mpio_cdpmp, muni);
            }
          });

          const municipalityOptions: FilterOption[] = [
            { id: 'all', name: 'Todos' },
            ...Array.from(uniqueMunicipalities.values())
              .map((muni: Municipality) => ({
                id: muni.mpio_cdpmp,
                name: muni.mpio_cnmbr
              }))
              .sort((a, b) => a.name.localeCompare(b.name))
          ];

          setMunicipalities(municipalityOptions);
        }
      } else {
        setMunicipalities([]);
      }
    }

    fetchMunicipalities();
  }, [selectedDepartment]);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Comparar otro Departamento / Municipio</h3>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="comparison"
            value="yes"
            checked={enabled}
            onChange={() => onEnableChange(true)}
            className="text-orange-600 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Sí</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="comparison"
            value="no"
            checked={!enabled}
            onChange={() => onEnableChange(false)}
            className="text-orange-600 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">No</span>
        </label>
      </div>

      {enabled && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departamento Comparación
            </label>
            <Listbox
              value={selectedDepartment}
              onChange={(value) => {
                onDepartmentChange(value);
                onMunicipalityChange(null);
              }}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {selectedDepartment?.name || 'Seleccionar departamento'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {uniqueDepartments.map((department) => (
                      <Listbox.Option
                        key={department.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                          }`
                        }
                        value={department}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {department.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Municipio Comparación
            </label>
            <Listbox
              value={selectedMunicipality}
              onChange={onMunicipalityChange}
              disabled={!selectedDepartment}
            >
              <div className="relative mt-1">
                <Listbox.Button className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${!selectedDepartment ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <span className="block truncate">
                    {selectedMunicipality?.name || 'Seleccionar municipio'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {municipalities.map((municipality) => (
                      <Listbox.Option
                        key={municipality.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                          }`
                        }
                        value={municipality}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {municipality.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      )}
    </div>
  );
}