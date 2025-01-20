import Advocate from "../types/Advocate";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
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
          <tr key={advocate.id} className="hover:bg-gray-50 transition-colors">
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
  );
}
