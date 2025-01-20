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
    return (
      advocate.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
      advocate.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
      advocate.city.toLowerCase().includes(lowerCaseSearchTerm) ||
      advocate.degree.toLowerCase().includes(lowerCaseSearchTerm) ||
      advocate.specialties.some((specialty) =>
        specialty.toLowerCase().includes(lowerCaseSearchTerm)
      ) ||
      advocate.yearsOfExperience.toString().includes(lowerCaseSearchTerm)
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
      <h1>Solace Advocates</h1>

      {isLoading && <p>Loading advocates...</p>}

      {error && (
        <p className="text-red-600">Error loading advocates: {error}</p>
      )}

      {!isLoading && !error && (
        <>
          <br />
          <br />
          <div>
            <p>Search</p>
            <p>
              Searching for: <span>{searchTerm}</span>
            </p>
            <input
              style={{ border: "border border-black" }}
              onChange={handleChangeSearch}
              value={searchTerm}
            />
            <button onClick={handleClickReset}>Reset Search</button>
          </div>
          <br />
          <br />
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>Degree</th>
                <th>Specialties</th>
                <th>Years of Experience</th>
                <th>Phone Number</th>
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
        </>
      )}
    </main>
  );
}
