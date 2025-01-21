import React from "react";
import { SearchableDropdown } from "../SearchableDropdown";

interface SpecialtiesFilterProps {
  selectedSpecialties: string[];
  onSpecialtiesChange: (specialties: string[]) => void;
  allSpecialties: string[];
}

export function SpecialtiesFilter({
  selectedSpecialties,
  onSpecialtiesChange,
  allSpecialties,
}: SpecialtiesFilterProps) {
  return (
    <SearchableDropdown
      options={allSpecialties}
      selectedValues={selectedSpecialties}
      onSelectionChange={onSpecialtiesChange}
      label="Specialties"
      placeholder="Search specialties..."
    />
  );
}
