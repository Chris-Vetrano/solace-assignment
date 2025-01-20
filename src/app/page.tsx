"use client";

import { useEffect, useState } from "react";
import Advocate from "./types/Advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvocates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/advocates");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data } = await response.json();
        setAdvocates(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch advocates"
        );
      } finally {
        setIsLoading(false);
      }
    };

    console.log("fetching advocates...");
    fetchAdvocates();
  }, []);

  const filteredAdvocates = advocates.filter((advocate) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const searchableFields = [
      advocate.firstName.toLowerCase(),
      advocate.lastName.toLowerCase(),
      advocate.city.toLowerCase(),
      advocate.degree.toLowerCase(),
      advocate.yearsOfExperience.toString(),
      ...advocate.specialties.map((speciality) => speciality.toLowerCase()),
    ];

    return searchableFields.some((field) =>
      field.includes(lowerCaseSearchTerm)
    );
  });

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClickReset = () => {
    setSearchTerm("");
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
            <table className="w-full">
              <caption>Available Healthcare Advocates</caption>
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">City</th>
                  <th scope="col">Degree</th>
                  <th scope="col">Specialties</th>
                  <th scope="col">Years of Experience</th>
                  <th scope="col">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdvocates.map((advocate) => {
                  return (
                    <tr key={advocate.id}>
                      <td>{advocate.firstName}</td>
                      <td>{advocate.lastName}</td>
                      <td>{advocate.city}</td>
                      <td>{advocate.degree}</td>
                      <td>
                        {advocate.specialties.map((specialty) => (
                          <div key={specialty}>{specialty}</div>
                        ))}
                      </td>
                      <td>{advocate.yearsOfExperience}</td>
                      <td>{advocate.phoneNumber}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </>
      )}
    </main>
  );
}
