// For CrimeBreakdown.jsx
import React, { useState } from "react";
import styles from "./CrimeBreakdown.module.css";
import { FaSearch, FaSortAmountDown, FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";

const CrimeBreakdown = ({ reports }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  
  // For demonstration, let's create some formatted crime data
  const crimeData = reports.map((report, index) => {
    const date = report.occured_time?.toDate() || new Date();

    // Convert location object to string if needed
    let locationStr = "Unknown location";
    if (report.occured_location) {
      if (typeof report.occured_location === "object" && "_lat" in report.occured_location && "_long" in report.occured_location) {
        locationStr = `lat: ${report.occured_location._lat.toFixed(4)}, long: ${report.occured_location._long.toFixed(4)}`;
      } else if (typeof report.occured_location === "string") {
        locationStr = report.occured_location;
      }
    }

    return {
      id: report.id,
      type: report.emergecy_type || "Unknown",
      location: locationStr,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      status: report.status || "pending",
      severity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)]
    };
  });
  
  const filteredData = crimeData.filter(crime => 
    crime.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crime.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "solved":
        return styles.statusSolved;
      case "pending":
        return styles.statusPending;
      case "ongoing":
        return styles.statusOngoing;
      default:
        return styles.statusPending;
    }
  };
  
  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return styles.severityHigh;
      case "medium":
        return styles.severityMedium;
      case "low":
        return styles.severityLow;
      default:
        return styles.severityMedium;
    }
  };
  
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search crimes..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="type">Sort by Type</option>
            <option value="severity">Sort by Severity</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
        <div className="col-md-3">
          <div className="d-flex justify-content-end">
            <button className="btn btn-outline-secondary me-2">
              <FaSortAmountDown /> Sort
            </button>
            <button className="btn btn-outline-dark">
              Export
            </button>
          </div>
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Crime Type</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((crime) => (
                <tr key={crime.id}>
                  <td>{crime.type}</td>
                  <td>{crime.location}</td>
                  <td>{crime.date}</td>
                  <td>{crime.time}</td>
                  <td>
                    <span className={`badge ${getSeverityClass(crime.severity)}`}>
                      {crime.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusClass(crime.status)}`}>
                      {crime.status.charAt(0).toUpperCase() + crime.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-secondary">
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <FaTrash />
                      </button>
                      <button className="btn btn-sm btn-outline-dark">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No crime records found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <p className="text-muted mb-0">Showing {filteredData.length} of {crimeData.length} records</p>
        </div>
        <nav>
          <ul className="pagination mb-0">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1">Previous</a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">3</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CrimeBreakdown;