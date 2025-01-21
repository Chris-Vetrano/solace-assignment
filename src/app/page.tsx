"use client";

import { useEffect, useState } from "react";
import Advocate from "./types/Advocate";
import Pagination from "./types/Pagination";
import { AdvocatesTable } from "./components/AdvocatesTable";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchAdvocates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: pagination.page.toString(),
          limit: pagination.limit.toString(),
        });

        if (searchTerm) {
          params.append("search", searchTerm);
        }

        const response = await fetch(`/api/advocates?${params}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data, pagination: paginationData } = await response.json();
        setAdvocates(data);
        setPagination(paginationData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch advocates"
        );
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce API requests
    const timeoutId = setTimeout(() => {
      fetchAdvocates();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [pagination.page, pagination.limit, searchTerm]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClickReset = () => {
    setSearchTerm("");
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <main className="m-6">
      <h1 className="text-2xl font-bold mb-6">Solace Advocates</h1>

      {isLoading && (
        <p role="status" aria-live="polite">
          Loading advocates...
        </p>
      )}

      {error && (
        <p role="alert" className="text-red-600">
          Error loading advocates: {error}
        </p>
      )}

      {!isLoading && !error && (
        <>
          <div className="my-6">
            <label htmlFor="advocate-search" className="block mb-2">
              Search advocates
            </label>
            <input
              id="advocate-search"
              className="border border-black p-2"
              onChange={handleChangeSearch}
              value={searchTerm}
              placeholder="Search by name, city, specialty..."
              type="search"
            />
            <button onClick={handleClickReset} className="ml-2">
              Reset Search
            </button>
          </div>

          <section aria-label="Advocate Search Results">
            <AdvocatesTable
              advocates={advocates}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </section>
        </>
      )}
    </main>
  );
}
