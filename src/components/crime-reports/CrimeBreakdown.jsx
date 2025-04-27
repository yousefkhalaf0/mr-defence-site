import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import * as XLSX from "xlsx";

export default function ReportsTable() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        const fetchedData = querySnapshot.docs.map(doc => doc.data());
        setReports(fetchedData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheetData = reports.map(report => ({
      "Emergency Type": report.emergecy_type,
      "Location": report.location_name,
      "Coordinates": `${report.occured_location[0]}, ${report.occured_location[1]}`,
      "Time": new Date(report.occured_time.seconds * 1000).toLocaleString(),
      "Status": report.status,
      "Voice Record": report.voice_records[0] || ""
    }));

    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Crime Reports");
    XLSX.writeFile(wb, "crime_reports.xlsx");
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-50 text-yellow-700";
      case "resolved": return "bg-green-50 text-green-700";
      case "rejected": return "bg-red-50 text-red-700";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  const filteredReports = activeFilter === "all" 
    ? reports 
    : reports.filter(report => report.status.toLowerCase() === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crime Reports Table</h1>
            <p className="text-gray-500">Detailed view of all reported incidents</p>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === "all" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Reports
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveFilter("resolved")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === "resolved" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Resolved
          </button>
          <button
            onClick={() => setActiveFilter("rejected")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === "rejected" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500">There are no reports matching your filter criteria.</p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crime Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 capitalize">{report.emergecy_type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.location_name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {report.occured_location[0]}, {report.occured_location[1]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(report.occured_time.seconds * 1000).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(report.occured_time.seconds * 1000).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {report.voice_records.map((voice, idx) => (
                          <audio 
                            key={idx}
                            controls
                            src={voice}
                            className="h-10 rounded-md"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}