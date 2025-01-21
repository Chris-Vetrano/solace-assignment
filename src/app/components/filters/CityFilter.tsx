import React from "react";

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
    <div className="space-y-2">
      <label className="block font-medium text-gray-700">Location</label>
      <select
        multiple
        className="w-full rounded-md border-gray-300 shadow-sm"
        value={selectedCities}
        onChange={(e) => {
          const selected = Array.from(
            e.target.selectedOptions,
            (option) => option.value
          );
          onCitiesChange(selected);
        }}
      >
        {availableCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-500">
        Hold Ctrl/Cmd to select multiple cities
      </p>
    </div>
  );
}
