import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import type { FilterOption } from '../../types/filters';
import { ZONES, DEPARTMENTS } from '../../config/constants';
import { fetchMunicipalitiesByDepartment } from '../../lib/api';

interface MunicipalityFilterProps {
  selectedZone: FilterOption | null;
  selectedDepartment: FilterOption | null;
  selectedMunicipality: FilterOption | null;
  onZoneChange: (zone: FilterOption | null) => void;
  onDepartmentChange: (department: FilterOption | null) => void;
  onMunicipalityChange: (municipality: FilterOption | null) => void;
}

export function MunicipalityFilter({
  selectedZone,
  selectedDepartment,
  selectedMunicipality,
  onZoneChange,
  onDepartmentChange,
  onMunicipalityChange
}: MunicipalityFilterProps) {
  const [municipalities, setMunicipalities] = useState<FilterOption[]>([]);

  // Filter departments based on selected zone and sort them
  const filteredDepartments = selectedZone
    ? selectedZone.id === 'pais'
      ? Array.from(
          new Map(
            DEPARTMENTS.map(dept => [dept.id, dept])
          ).values()
        ).sort((a, b) => a.name.localeCompare(b.name))
      : DEPARTMENTS.filter(dept => dept.zone === selectedZone.id)
          .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  useEffect(() => {
    async function loadMunicipalities() {
      if (selectedDepartment) {
        try {
          const municipalityOptions = await fetchMunicipalitiesByDepartment(selectedDepartment.id);
          setMunicipalities(municipalityOptions);
        } catch (error) {
          console.error('Error loading municipalities:', error);
          setMunicipalities([]);
        }
      } else {
        setMunicipalities([]);
      }
    }

    loadMunicipalities();
  }, [selectedDepartment]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seleccione Zona o Lista Recurrente
        </label>
        <Listbox value={selectedZone} onChange={(value) => {
          onZoneChange(value);
          onDepartmentChange(null);
          onMunicipalityChange(null);
        }}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedZone?.name || 'Seleccionar zona'}</span>
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
                {ZONES.map((zone) => (
                  <Listbox.Option
                    key={zone.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                      }`
                    }
                    value={zone}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {zone.name}
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
          Departamento
        </label>
        <Listbox 
          value={selectedDepartment} 
          onChange={(value) => {
            onDepartmentChange(value);
            onMunicipalityChange(null);
          }}
          disabled={!selectedZone}
        >
          <div className="relative mt-1">
            <Listbox.Button className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${!selectedZone ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span className="block truncate">{selectedDepartment?.name || 'Seleccionar departamento'}</span>
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
                {filteredDepartments.map((department) => (
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
          Municipio
        </label>
        <Listbox 
          value={selectedMunicipality} 
          onChange={onMunicipalityChange}
          disabled={!selectedDepartment}
        >
          <div className="relative mt-1">
            <Listbox.Button className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${!selectedDepartment ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span className="block truncate">{selectedMunicipality?.name || 'Seleccionar municipio'}</span>
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
  );
}