import React from "react";

export type ExperienceRange = "0-2" | "3-5" | "6-10" | "10+";

interface ExperienceFilterProps {
  selectedRange: ExperienceRange | undefined;
  onRangeChange: (range: ExperienceRange | undefined) => void;
}

const ranges: ExperienceRange[] = ["0-2", "3-5", "6-10", "10+"];

export function ExperienceFilter({
  selectedRange,
  onRangeChange,
}: ExperienceFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700">
        Years of Experience
      </label>
      <select
        className="w-full rounded-md border-gray-300 shadow-sm"
        value={selectedRange || ""}
        onChange={(e) => {
          const value = e.target.value as ExperienceRange | "";
          onRangeChange(value || undefined);
        }}
      >
        <option value="">Any experience</option>
        {ranges.map((range) => (
          <option key={range} value={range}>
            {range} years
          </option>
        ))}
      </select>
    </div>
  );
}
