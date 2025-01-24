import React from "react";
import { SearchableDropdown } from "../SearchableDropdown";

interface CityFilterProps {
  selectedCities: string[];
  onCitiesChange: (cities: string[]) => void;
  availableCities: string[];
}

export function CityFilter({
  selectedCities,
  onCitiesChange,
  availableCities,
}: CityFilterProps) {
  return (
    <SearchableDropdown
      label="Location"
      options={availableCities}
      selectedValues={selectedCities}
      onSelectionChange={onCitiesChange}
      placeholder="Search cities..."
    />
  );
}
