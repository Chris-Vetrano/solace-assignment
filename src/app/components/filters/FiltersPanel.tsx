import React from "react";
import { SpecialtiesFilter } from "./SpecialtiesFilter";
import { CityFilter } from "./CityFilter";
import { ExperienceFilter } from "./ExperienceFilter";
import { FilterOptions } from "@/app/types/FilterOptions";
import { ActiveFilters } from "@/app/types/ActiveFilters";
import { DegreeFilter } from "./DegreeFilter";

interface FiltersPanelProps {
  activeFilters: ActiveFilters;
  filterOptions: FilterOptions;
  onFilterChange: <K extends keyof ActiveFilters>(
    filterType: K,
    value: ActiveFilters[K]
  ) => void;
  onResetFilters: () => void;
}

export function FiltersPanel({
  activeFilters,
  filterOptions,
  onFilterChange,
  onResetFilters,
}: FiltersPanelProps) {
  const hasActiveFilters =
    (activeFilters.specialties?.length ?? 0) > 0 ||
    (activeFilters.cities?.length ?? 0) > 0 ||
    (activeFilters.degrees?.length ?? 0) > 0 ||
    activeFilters.experienceRange !== undefined;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-150"
            >
              Reset all
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200 overflow-auto flex-1">
        <div className="p-4 space-y-2">
          <SpecialtiesFilter
            selectedSpecialties={activeFilters.specialties ?? []}
            onSpecialtiesChange={(value) =>
              onFilterChange("specialties", value)
            }
            allSpecialties={filterOptions.allSpecialties}
          />
        </div>

        <div className="p-4 space-y-2">
          <CityFilter
            selectedCities={activeFilters.cities ?? []}
            onCitiesChange={(value) => onFilterChange("cities", value)}
            availableCities={filterOptions.cities}
          />
        </div>

        <div className="p-4 space-y-2">
          <DegreeFilter
            selectedDegrees={activeFilters.degrees ?? []}
            onDegreesChange={(value) => onFilterChange("degrees", value)}
            availableDegrees={filterOptions.allDegrees}
          />
        </div>

        <div className="p-4 space-y-2">
          <ExperienceFilter
            selectedRange={activeFilters.experienceRange}
            onRangeChange={(value) => onFilterChange("experienceRange", value)}
          />
        </div>
      </div>
    </div>
  );
}
