import React from "react";
import { ColoredPill } from "./common/ColoredPill";
import { Advocate } from "../types/Advocate";
import { Pagination } from "../types/Pagination";

interface AdvocatesTableProps {
  advocates: Advocate[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export function AdvocatesTable({
  advocates,
  pagination,
  onPageChange,
}: AdvocatesTableProps) {
  return (
    <div className="overflow-hidden bg-white rounded-xl shadow-sm">
      <table className="min-w-full border-collapse">
        <caption className="sr-only">Available Healthcare Advocates</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-indigo-100"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-indigo-100"
            >
              City
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-indigo-100"
            >
              Degree
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-indigo-100"
            >
              Specialties
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-indigo-100"
            >
              Years of Experience
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-indigo-100"
            >
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {advocates.map((advocate) => (
            <tr
              key={advocate.id}
              className="hover:bg-indigo-50/30 transition-all duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">
                {advocate.firstName} {advocate.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {advocate.city}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                  {advocate.degree}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <div className="flex flex-wrap gap-1.5">
                  {advocate.specialties.map((specialty) => (
                    <ColoredPill
                      key={`${advocate.id}-${specialty}`}
                      label={specialty}
                    />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {advocate.yearsOfExperience}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {advocate.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="relative ml-3 inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page{" "}
                <span className="font-medium">{pagination.page}</span> of{" "}
                <span className="font-medium">{pagination.totalPages}</span>
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => onPageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onPageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
