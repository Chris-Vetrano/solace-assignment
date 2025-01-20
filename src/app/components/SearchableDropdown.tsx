import React, { useState, useRef, useEffect } from "react";

interface SearchableDropdownProps {
  options: string[];
  selectedValues: string[];
  onSelectionChange: (selected: string[]) => void;
  label: string;
  placeholder?: string;
  renderSelectedValue?: (value: string) => React.ReactNode;
}

export function SearchableDropdown({
  options,
  selectedValues,
  onSelectionChange,
  label,
  placeholder = "Search...",
  renderSelectedValue,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onSelectionChange(selectedValues.filter((v) => v !== option));
    } else {
      onSelectionChange([...selectedValues, option]);
    }
  };

  return (
    <div className="space-y-1" ref={dropdownRef}>
      <label className="block font-medium text-gray-700">{label}</label>

      <div className="relative">
        <button
          type="button"
          className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValues.length > 0 ? (
            <span className="flex flex-wrap gap-1">
              {selectedValues.length > 2
                ? `${selectedValues.length} selected`
                : selectedValues.map((value) => (
                    <span key={value}>
                      {renderSelectedValue ? renderSelectedValue(value) : value}
                    </span>
                  ))}
            </span>
          ) : (
            <span className="text-gray-500">Select options...</span>
          )}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="p-2 border-b">
              <input
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="p-2 text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleOption(option)}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      checked={selectedValues.includes(option)}
                      onChange={() => {}} // Handled by parent div click
                    />
                    <span className="ml-2">
                      {renderSelectedValue
                        ? renderSelectedValue(option)
                        : option}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedValues.map((value) => (
            <span key={value}>
              {renderSelectedValue ? (
                <div
                  onClick={() => toggleOption(value)}
                  className="cursor-pointer"
                >
                  {renderSelectedValue(value)}
                </div>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                  {value}
                  <button
                    onClick={() => toggleOption(value)}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
