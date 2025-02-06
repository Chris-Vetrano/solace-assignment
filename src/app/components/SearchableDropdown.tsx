import React, { useState, useRef, useEffect, KeyboardEvent } from "react";

interface SearchableDropdownProps {
  options: string[];
  selectedValues: string[];
  onSelectionChange: (selected: string[]) => void;
  label: string;
  placeholder?: string;
  renderSelectedValue?: (value: string) => React.ReactNode;
  isLoading?: boolean;
}

export function SearchableDropdown({
  options,
  selectedValues,
  onSelectionChange,
  label,
  placeholder = "Search...",
  renderSelectedValue,
  isLoading = false,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const focusedOptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (focusedOptionIndex >= 0 && optionsRef.current) {
      const optionElement = optionsRef.current.children[0]?.children[
        focusedOptionIndex
      ] as HTMLElement;

      if (optionElement) {
        optionElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [focusedOptionIndex]);

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchTerm("");
    setFocusedOptionIndex(-1);
  };

  const filteredOptions = options.filter(
    (option) =>
      !selectedValues.includes(option) &&
      option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onSelectionChange(selectedValues.filter((v) => v !== option));
    } else {
      onSelectionChange([...selectedValues, option]);
    }
    setSearchTerm("");
    setFocusedOptionIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedOptionIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedOptionIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedOptionIndex >= 0) {
          toggleOption(filteredOptions[focusedOptionIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      case "Tab":
        closeDropdown();
        break;
    }
  };

  const handleFocus = (e: React.FocusEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.relatedTarget as Node)
    ) {
      closeDropdown();
    }
  };

  return (
    <div className="space-y-1" ref={dropdownRef} onBlur={handleFocus}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="relative mt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2.5 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-150 ${
            isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onKeyDown={handleKeyDown}
        >
          <span className="block truncate">
            {selectedValues.length > 0 ? (
              <span className="flex flex-wrap gap-1.5">
                {selectedValues.length > 2
                  ? `${selectedValues.length} selected`
                  : selectedValues.map((value) => (
                      <span key={value} className="inline-flex items-center">
                        {renderSelectedValue
                          ? renderSelectedValue(value)
                          : value}
                      </span>
                    ))}
              </span>
            ) : (
              <span className="text-gray-400">Select options...</span>
            )}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className={`h-5 w-5 text-gray-400 transform transition-transform duration-150 ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div
            className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transform opacity-100 scale-100 transition-all duration-100 origin-top"
            role="listbox"
            aria-multiselectable="true"
          >
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-150"
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setFocusedOptionIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div
              ref={optionsRef}
              className="max-h-60 overflow-y-auto overscroll-contain"
            >
              {isLoading ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center bg-gray-50">
                  Loading...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center bg-gray-50">
                  No options found
                </div>
              ) : (
                <div className="py-1">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={option}
                      ref={
                        index === focusedOptionIndex ? focusedOptionRef : null
                      }
                      onClick={() => toggleOption(option)}
                      className={`flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer transition-colors duration-150 ${
                        focusedOptionIndex === index
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                      role="option"
                      aria-selected={selectedValues.includes(option)}
                      tabIndex={-1}
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div
                          className={`flex-shrink-0 w-4 h-4 border rounded transition-colors duration-150 mr-3 ${
                            selectedValues.includes(option)
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedValues.includes(option) && (
                            <svg
                              className="w-4 h-4 text-white"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="truncate">
                          {renderSelectedValue
                            ? renderSelectedValue(option)
                            : option}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selectedValues.map((value) => (
            <div
              key={value}
              className="group relative inline-flex"
              role="button"
              onClick={() => toggleOption(value)}
            >
              {renderSelectedValue ? (
                renderSelectedValue(value)
              ) : (
                <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-150">
                  {value}
                  <svg
                    className="ml-1.5 h-4 w-4 text-blue-500 group-hover:text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
