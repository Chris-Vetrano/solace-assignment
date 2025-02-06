import React from "react";
import { ColoredPill } from "../common/ColoredPill";
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
  const renderSelectedValue = (specialty: string) => (
    <ColoredPill key={specialty} label={specialty} className="m-0.5" />
  );

  return (
    <SearchableDropdown
      options={allSpecialties}
      selectedValues={selectedSpecialties}
      onSelectionChange={onSpecialtiesChange}
      label="Specialties"
      placeholder="Search specialties..."
      renderSelectedValue={renderSelectedValue}
    />
  );
}
