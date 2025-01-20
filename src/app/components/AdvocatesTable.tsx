import Advocate from "../types/Advocate";
import Pagination from "../types/Pagination";

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
    <div>
      <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <caption className="text-left text-lg font-semibold mb-4">
          Available Healthcare Advocates
        </caption>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              First Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              City
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Degree
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Specialties
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Years of Experience
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
            >
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {advocates.map((advocate) => (
            <tr
              key={advocate.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advocate.firstName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advocate.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advocate.city}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advocate.degree}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <ul className="list-disc pl-4 space-y-1">
                  {advocate.specialties.map((specialty) => (
                    <li key={`${advocate.id}-${specialty}`}>{specialty}</li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advocate.yearsOfExperience}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advocate.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing page {pagination.page} of {pagination.totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
