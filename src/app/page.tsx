"use client";

import { useEffect, useState } from "react";
import { AdvocatesTable } from "./components/AdvocatesTable";
import { FiltersPanel } from "./components/filters/FiltersPanel";
import { ActiveFilters } from "./types/ActiveFilters";
import { Advocate } from "./types/Advocate";
import { ApiResponse } from "./types/ApiResponse";
import { FilterOptions } from "./types/FilterOptions";
import { Pagination } from "./types/Pagination";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    searchTerm: "",
    specialties: [],
    cities: [],
    degrees: [],
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    cities: [],
    allSpecialties: [],
    allDegrees: [],
  });

  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchAdvocates = async () => {
      if (isInitialLoading) {
        setIsInitialLoading(true);
      } else {
        setIsUpdating(true);
      }
      setError(null);

      try {
        const params = new URLSearchParams({
          page: pagination.page.toString(),
          limit: pagination.limit.toString(),
        });

        if (activeFilters.searchTerm) {
          params.append("search", activeFilters.searchTerm);
        }

        activeFilters.specialties?.forEach((specialty) => {
          params.append("specialties", specialty);
        });

        activeFilters.cities?.forEach((city) => {
          params.append("cities", city);
        });

        activeFilters.degrees?.forEach((degree) => {
          params.append("degrees", degree);
        });

        if (activeFilters.experienceRange) {
          params.append("experienceRange", activeFilters.experienceRange);
        }

        const response = await fetch(`/api/advocates?${params}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setAdvocates(data.data);
        setPagination(data.pagination);
        setFilterOptions(data.filterOptions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch advocates"
        );
      } finally {
        setIsInitialLoading(false);
        setIsUpdating(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchAdvocates();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [pagination.page, pagination.limit, activeFilters, isInitialLoading]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveFilters((prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = <K extends keyof ActiveFilters>(
    filterType: K,
    value: ActiveFilters[K]
  ) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setActiveFilters({
      searchTerm: "",
      specialties: [],
      cities: [],
      degrees: [],
      experienceRange: undefined,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setActiveFilters((prev) => ({
        ...prev,
        searchTerm: "",
      }));
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  };

  if (isInitialLoading) {
    return (
      <main className="m-6">
        <h1 className="text-2xl font-bold mb-6">Healthcare Advocates</h1>
        <p role="status" aria-live="polite" className="text-gray-600">
          Loading advocates...
        </p>
      </main>
    );
  }

  if (error && isInitialLoading) {
    return (
      <main className="m-6">
        <h1 className="text-2xl font-bold mb-6">Healthcare Advocates</h1>
        <p role="alert" className="text-red-600">
          Error loading advocates: {error}
        </p>
      </main>
    );
  }

  return (
    <main className="h-screen bg-gray-50 overflow-hidden">
      <div className="h-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Healthcare Advocates
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100%-5rem)]">
          <aside className="w-full lg:w-80 overflow-auto">
            <FiltersPanel
              activeFilters={activeFilters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </aside>

          <div className="flex-1 space-y-6 overflow-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
                id="advocate-search"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow duration-150 ease-in-out"
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                value={activeFilters.searchTerm || ""}
                placeholder="Search by name, city, specialty..."
                type="search"
              />
            </div>

            <section
              aria-label="Advocate Search Results"
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              {isUpdating ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-600">Updating results...</p>
                </div>
              ) : error ? (
                <p role="alert" className="text-red-600">
                  Error loading advocates: {error}
                </p>
              ) : (
                <AdvocatesTable
                  advocates={advocates}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
