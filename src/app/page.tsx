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
    <main className="m-6">
      <h1 className="text-2xl font-bold mb-6">Healthcare Advocates</h1>

      <div className="flex gap-6">
        <aside className="w-80">
          <FiltersPanel
            activeFilters={activeFilters}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </aside>

        <div className="flex-1">
          <div className="mb-6">
            <label
              htmlFor="advocate-search"
              className="block mb-2 font-medium text-gray-700"
            >
              Search advocates
            </label>
            <input
              id="advocate-search"
              className="w-full max-w-md border border-gray-300 rounded-md p-2"
              onChange={handleSearchChange}
              value={activeFilters.searchTerm || ""}
              placeholder="Search by name, city, specialty..."
              type="search"
            />
          </div>

          <section aria-label="Advocate Search Results">
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
    </main>
  );
}
