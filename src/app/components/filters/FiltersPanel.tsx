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
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={onResetFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset all filters
        </button>
      </div>

      <SpecialtiesFilter
        selectedSpecialties={activeFilters.specialties || []}
        onSpecialtiesChange={(value) => onFilterChange("specialties", value)}
        allSpecialties={filterOptions.allSpecialties}
      />

      <CityFilter
        selectedCities={activeFilters.cities || []}
        onCitiesChange={(value) => onFilterChange("cities", value)}
        availableCities={filterOptions.cities}
      />

      <DegreeFilter
        selectedDegrees={activeFilters.degrees || []}
        onDegreesChange={(value) => onFilterChange("degrees", value)}
        availableDegrees={filterOptions.allDegrees}
      />

      <ExperienceFilter
        selectedRange={activeFilters.experienceRange}
        onRangeChange={(value) => onFilterChange("experienceRange", value)}
      />
    </div>
  );
}
