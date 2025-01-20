import { Degree } from "@/app/constants/advocates";
import React from "react";

interface DegreeFilterProps {
  selectedDegrees: string[];
  onDegreesChange: (degrees: string[]) => void;
  availableDegrees: Degree[];
}

export function DegreeFilter({
  selectedDegrees,
  onDegreesChange,
  availableDegrees,
}: DegreeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700">Qualifications</label>
      <div className="flex flex-wrap gap-2">
        {availableDegrees.map((degree) => (
          <label
            key={degree}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={selectedDegrees.includes(degree)}
              onChange={(e) => {
                if (e.target.checked) {
                  onDegreesChange([...selectedDegrees, degree]);
                } else {
                  onDegreesChange(selectedDegrees.filter((d) => d !== degree));
                }
              }}
            />
            <span
              className={`text-sm ${
                selectedDegrees.includes(degree)
                  ? "font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {degree}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
